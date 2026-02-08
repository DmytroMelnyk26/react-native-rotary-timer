import { useContext, useMemo } from 'react';
import type { IRotaryTimerContext } from '../context/types';
import RotaryTimerContext from '../context/RotaryTimerContext';

const useRotaryTimer = (): IRotaryTimerContext => {
  const value = useContext(RotaryTimerContext);
  if (value === null) {
    throw new Error('useRotaryTimer must be used within a RotaryTimerProvider');
  }

  return useMemo(() => value, [value]);
};

export default useRotaryTimer;
