import { createContext } from 'react';
import type { SharedValue } from 'react-native-reanimated';

export interface IRotaryTimerCoreContext {
  size: number;
  ringWidth: number;
  rotationSharedValue: SharedValue<number>;
  isDraggingSharedValue: SharedValue<boolean>;
  isEditable?: boolean;
  initialRotation?: number;
  minRotation?: number;
  maxRotation?: number;
}

export const RotaryTimerCoreContext =
  createContext<IRotaryTimerCoreContext | null>(null);
