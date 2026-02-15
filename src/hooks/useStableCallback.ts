import { useRef, useCallback, useEffect } from 'react';

type AnyFn = (...args: any[]) => void;

export const useStableCallback = <F extends AnyFn>(
  callback: F | undefined
): F => {
  const callbackRef = useRef<F | undefined>(callback);

  const memoCallback = useCallback(
    ((...args: Parameters<F>) => {
      callbackRef.current?.(...args);
    }) as F,
    []
  );

  useEffect(() => {
    callbackRef.current = callback;
    return () => {
      callbackRef.current = undefined;
    };
  }, [callback]);

  return memoCallback;
};
