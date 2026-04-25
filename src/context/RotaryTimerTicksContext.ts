import { createContext } from 'react';
import type { IRotaryTimerTicksProps } from '../types';

export const RotaryTimerTicksContext =
  createContext<IRotaryTimerTicksProps | null>(null);
