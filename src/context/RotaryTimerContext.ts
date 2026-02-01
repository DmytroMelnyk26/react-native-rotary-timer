import { createContext } from 'react';
import type { IRotaryTimerContext } from './types';

const RotaryTimerContext = createContext<IRotaryTimerContext | null>(null);

export default RotaryTimerContext;
