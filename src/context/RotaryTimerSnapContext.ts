import { createContext } from 'react';
import type { IRotaryTimerSnapProps } from '../types';

export const RotaryTimerSnapContext =
  createContext<IRotaryTimerSnapProps | null>(null);
