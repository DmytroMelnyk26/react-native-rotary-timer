import { TWO_PI } from '../../constants';
import {
  angleFromPointTopZero,
  getStepAngle,
  maxMinValue,
  normalizeDeltaAngle,
  normalizeAngle0To2Pi,
  snapToStep,
} from '../../helpers/math';

describe('normalizeAngle0To2Pi', () => {
  it('returns 0 for 0', () => {
    expect(normalizeAngle0To2Pi(0)).toBeCloseTo(0);
  });

  it('returns 0 for TWO_PI', () => {
    expect(normalizeAngle0To2Pi(TWO_PI)).toBeCloseTo(0);
  });

  it('returns 3PI/2 for -PI/2', () => {
    expect(normalizeAngle0To2Pi(-Math.PI / 2)).toBeCloseTo((3 * Math.PI) / 2);
  });

  it('returns 0 for 3*TWO_PI', () => {
    expect(normalizeAngle0To2Pi(3 * TWO_PI)).toBeCloseTo(0);
  });

  it('returns PI for PI', () => {
    expect(normalizeAngle0To2Pi(Math.PI)).toBeCloseTo(Math.PI);
  });
});

describe('normalizeDeltaAngle', () => {
  it('returns value unchanged when within [-PI, PI]', () => {
    expect(normalizeDeltaAngle(0.5)).toBeCloseTo(0.5);
  });

  it('wraps PI+0.1 to -(PI-0.1)', () => {
    expect(normalizeDeltaAngle(Math.PI + 0.1)).toBeCloseTo(-(Math.PI - 0.1));
  });

  it('wraps -PI-0.1 to PI-0.1', () => {
    expect(normalizeDeltaAngle(-Math.PI - 0.1)).toBeCloseTo(Math.PI - 0.1);
  });

  it('does not change PI (boundary)', () => {
    expect(normalizeDeltaAngle(Math.PI)).toBeCloseTo(Math.PI);
  });

  it('does not change -PI (boundary)', () => {
    expect(normalizeDeltaAngle(-Math.PI)).toBeCloseTo(-Math.PI);
  });
});

describe('angleFromPointTopZero', () => {
  it('(0, -1) to 0 (top)', () => {
    expect(angleFromPointTopZero(0, -1)).toBeCloseTo(0);
  });

  it('(1, 0) to PI/2 (right)', () => {
    expect(angleFromPointTopZero(1, 0)).toBeCloseTo(Math.PI / 2);
  });

  it('(0, 1) to PI (bottom)', () => {
    expect(angleFromPointTopZero(0, 1)).toBeCloseTo(Math.PI);
  });

  it('(-1, 0) to 3PI/2 (left)', () => {
    expect(angleFromPointTopZero(-1, 0)).toBeCloseTo((3 * Math.PI) / 2);
  });

  it('result is always in [0, 2PI)', () => {
    const points = [
      [1, 1],
      [-1, -1],
      [0.5, -0.5],
      [-0.3, 0.7],
    ];
    points.forEach(([x, y]) => {
      const result = angleFromPointTopZero(x!, y!);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(TWO_PI);
    });
  });
});

describe('getStepAngle', () => {
  it('returns angle when angle is provided', () => {
    expect(getStepAngle(1.5)).toBe(1.5);
  });

  it('returns TWO_PI/stepCount when only stepCount is provided', () => {
    expect(getStepAngle(undefined, 60)).toBeCloseTo(TWO_PI / 60);
  });

  it('returns 0 when both are undefined', () => {
    expect(getStepAngle()).toBe(0);
  });

  it('prefers stepCount when angle is 0 (falsy)', () => {
    expect(getStepAngle(0, 60)).toBeCloseTo(TWO_PI / 60);
  });
});

describe('snapToStep', () => {
  it('snaps 1.4 to 1 with step=1', () => {
    expect(snapToStep(1.4, 1)).toBe(1);
  });

  it('snaps 1.6 to 2 with step=1', () => {
    expect(snapToStep(1.6, 1)).toBe(2);
  });

  it('returns value unchanged when step=0', () => {
    expect(snapToStep(1.7, 0)).toBe(1.7);
  });

  it('returns maxValue when it is closer than the snapped result', () => {
    expect(snapToStep(9.8, 1, 0, 10)).toBe(10);
  });

  it('returns minValue when it is closer than the snapped result', () => {
    expect(snapToStep(0.1, 1, 0, undefined, 0)).toBe(0);
  });

  it('returns maxValue when it is closer than the snapped result and maxValue not in the snapped result', () => {
    expect(snapToStep(9.8, 1, 0, 9.9)).toBe(9.9);
  });

  it('returns minValue when it is closer than the snapped result and minValue not in the snapped result', () => {
    expect(snapToStep(0.2, 1, 0, undefined, 0.1)).toBe(0.1);
  });

  it('applies offset to the grid', () => {
    expect(snapToStep(1.6, 1, 0.5)).toBeCloseTo(1.5);
  });
});

describe('maxMinValue', () => {
  it('returns value when within [min, max]', () => {
    expect(maxMinValue(5, 10, 0)).toBe(5);
  });

  it('clamps to max when value exceeds max', () => {
    expect(maxMinValue(15, 10, 0)).toBe(10);
  });

  it('clamps to min when value is below min', () => {
    expect(maxMinValue(-5, 10, 0)).toBe(0);
  });

  it('uses +Infinity as default max', () => {
    expect(maxMinValue(1e9, undefined, 0)).toBe(1e9);
  });

  it('uses -Infinity as default min', () => {
    expect(maxMinValue(-1e9, 0)).toBe(-1e9);
  });
});
