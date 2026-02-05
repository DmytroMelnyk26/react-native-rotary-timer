import type { SharedValue } from 'react-native-reanimated';
import type { ISnapProps } from '../types';

export interface IRotaryTimerContext extends ISnapProps {
  size: number;
  ringWidth: number;
  ticksCount: number;
  feedbackTicksCount: number;
  isEditable?: boolean;
  rotationSharedValue: SharedValue<number>;
  onChange?: (ms: number) => void;
  onFeedback?: () => void;
  renderLabel: (rad: number) => string;

  onTouchTimerStart?: (rad: number) => void;
  onTouchTimerEnd?: (rad: number) => void;
}

export interface IRotaryTimerDependencyContext {
  center: number;
  radius: number;
}
