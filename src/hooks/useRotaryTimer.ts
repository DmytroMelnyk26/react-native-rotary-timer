import { useContext, useMemo } from 'react';
import { RotaryTimerContext, type IRotaryTimerContext } from '../context';

export const useRotaryTimer = (): IRotaryTimerContext => {
  const value = useContext(RotaryTimerContext);
  if (value === null) {
    throw new Error('useRotaryTimer must be used within a RotaryTimerProvider');
  }

  return useMemo(() => value, [value]);
};
