import { createContext } from 'react';
import type {
  IGradientColors,
  IRotaryTimerBackgroundProps,
  IRotaryTimerHintProps,
  IRotaryTimerLabelProps,
  IRotaryTimerMarkerProps,
} from '../types';

export interface IRotaryTimerAppearanceContext
  extends IRotaryTimerMarkerProps,
    IRotaryTimerLabelProps,
    IRotaryTimerHintProps,
    IRotaryTimerBackgroundProps {
  ringActiveColor?: IGradientColors;
  ringInactiveColor?: string;
}

export const RotaryTimerAppearanceContext =
  createContext<IRotaryTimerAppearanceContext | null>(null);
