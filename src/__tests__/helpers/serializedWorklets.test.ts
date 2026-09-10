import * as babel from '@babel/core';
import fs from 'fs';
import path from 'path';

import { DEFAULT_MINUTES_PER_CIRCLE, TWO_PI } from '../../constants';

/**
 * On the UI runtime a worklet is not the function jest sees: it is rebuilt from
 * the serialized `__initData.code`, in which the worklets Babel plugin unpacks
 * the captured closure with a `const` destructuring at the top of the body.
 *
 * Parameter defaults are evaluated in the parameter scope, which is entered
 * *before* the body runs, so a default value referencing a module-scope binding
 * resolves against the global object and throws
 * `ReferenceError: Property 'DEFAULT_MINUTES_PER_CIRCLE' doesn't exist` — but
 * only on the UI thread, and only when the argument is omitted.
 *
 * The helpers are therefore compiled here and executed the way the UI runtime
 * does, which a direct call from a normal test cannot reproduce.
 */
const buildSerializedWorklets = (
  relativePath: string
): Map<string, (this: { __closure: object }, ...args: number[]) => number> => {
  const filename = path.resolve(__dirname, relativePath);
  const output = babel.transformSync(fs.readFileSync(filename, 'utf8'), {
    filename,
    presets: [require.resolve('@babel/preset-typescript')],
    plugins: [require.resolve('react-native-worklets/plugin')],
    babelrc: false,
    configFile: false,
  });

  const worklets = new Map();
  for (const match of (output?.code ?? '').matchAll(
    /code:\s*"((?:[^"\\]|\\.)*)"/g
  )) {
    const source = JSON.parse(`"${match[1]}"`) as string;
    const name = source.match(
      /^function\s+([A-Za-z0-9_$]+?)_[A-Za-z0-9]+\(/
    )?.[1];
    if (name) {
      // Building the function from its serialized source is the point: it is
      // what the UI runtime does, and what makes the parameter-scope fault
      // observable at all.
      // eslint-disable-next-line no-new-func
      worklets.set(name, new Function(`return ${source}`)());
    }
  }
  return worklets;
};

describe('serialized worklets', () => {
  const worklets = buildSerializedWorklets('../../helpers/convertation.ts');
  const closure = { __closure: { DEFAULT_MINUTES_PER_CIRCLE, TWO_PI } };

  it('exposes the compiled converters', () => {
    expect([...worklets.keys()]).toEqual(
      expect.arrayContaining([
        'convertRadiansToMilliseconds',
        'convertMillisecondsToRadians',
      ])
    );
  });

  it('convertRadiansToMilliseconds falls back to the default circle', () => {
    const worklet = worklets.get('convertRadiansToMilliseconds')!;
    expect(worklet.call(closure, TWO_PI)).toBe(
      DEFAULT_MINUTES_PER_CIRCLE * 60 * 1000
    );
  });

  it('convertMillisecondsToRadians falls back to the default circle', () => {
    const worklet = worklets.get('convertMillisecondsToRadians')!;
    expect(worklet.call(closure, DEFAULT_MINUTES_PER_CIRCLE * 60 * 1000)).toBe(
      TWO_PI
    );
  });

  it('honours an explicitly passed minutesPerCircle', () => {
    const worklet = worklets.get('convertRadiansToMilliseconds')!;
    expect(worklet.call(closure, TWO_PI, 30)).toBe(30 * 60 * 1000);
  });
});
