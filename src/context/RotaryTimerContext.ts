import { createContext } from 'react';
import type { IRotaryTimerContext } from './types';

export const RotaryTimerContext = createContext<IRotaryTimerContext | null>(
  null
);
