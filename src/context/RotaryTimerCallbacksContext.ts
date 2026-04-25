import { createContext } from 'react';

export interface IRotaryTimerCallbacksContext {
  onChange?: (rad: number) => void;
  onTouchStart?: (rad: number) => void;
  onTouchEnd?: (rad: number) => void;
  onFeedback?: () => void;
}

export const RotaryTimerCallbacksContext =
  createContext<IRotaryTimerCallbacksContext | null>(null);
