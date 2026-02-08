import { useCallback, useEffect, useMemo, useRef } from 'react';

type Interval = ReturnType<typeof setInterval>;

const useCountdown = (countdown: () => Interval) => {
  const intervalRef = useRef<Interval>(null);

  useEffect(() => {
    intervalRef.current = countdown();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [countdown]);

  const onTouchStart = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    intervalRef.current = countdown();
  }, [countdown]);

  return useMemo(() => {
    return { onTouchStart, onTouchEnd };
  }, [onTouchStart, onTouchEnd]);
};

export default useCountdown;
