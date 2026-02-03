import type { SharedValue } from 'react-native-reanimated';

export interface IRotaryTimerContext {
  size: number;
  ringWidth: number;
  ticksCount: number;
  isEditable?: boolean;
  feedbackTicksCount: number;
  rotationSharedValue: SharedValue<number>;
  onChange?: (ms: number) => void;
  onFeedback?: () => void;
  renderLabel: (rad: number) => string;
}

export interface IRotaryTimerDependencyContext {
  center: number;
  radius: number;
}
