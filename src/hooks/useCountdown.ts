import { useCallback, useEffect, useMemo, useRef } from 'react';

type Interval = ReturnType<typeof setInterval>;

export const useCountdown = (
  countdown: () => Interval,
  isActive: boolean = true
) => {
  const intervalRef = useRef<Interval>(null);

  const startCountdown = useCallback(() => {
    intervalRef.current = countdown();
  }, [intervalRef, countdown]);

  const stopCountdown = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = null;
  }, [intervalRef]);

  useEffect(() => {
    if (isActive) {
      startCountdown();
    }

    return () => stopCountdown();
  }, [isActive, startCountdown, stopCountdown]);

  const onTouchStart = useCallback(() => {
    stopCountdown();
  }, [stopCountdown]);

  const onTouchEnd = useCallback(() => {
    if (isActive) {
      startCountdown();
    }
  }, [isActive, startCountdown]);

  return useMemo(
    () => ({ onTouchStart, onTouchEnd }),
    [onTouchStart, onTouchEnd]
  );
};
