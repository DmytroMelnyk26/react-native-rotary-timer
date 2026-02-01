import { useContext, useMemo } from 'react';
import type {
  IRotaryTimerContext,
  IRotaryTimerDependencyContext,
} from '../context/types';
import RotaryTimerContext from '../context/RotaryTimerContext';

const useRotaryTimer = (): IRotaryTimerContext &
  IRotaryTimerDependencyContext => {
  const value = useContext(RotaryTimerContext);
  if (value === null) {
    throw new Error('useRotaryTimer must be used within a RotaryTimerProvider');
  }

  const center = value.size / 2;
  const radius = (value.size - value.ringWidth) / 2;

  return useMemo(
    () => ({
      ...value,
      center,
      radius,
    }),
    [value, center, radius]
  );
};

export default useRotaryTimer;
