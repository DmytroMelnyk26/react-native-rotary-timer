import type { SharedValue } from 'react-native-reanimated';
import type { IFeedbackProps, ISnapProps } from '../types';

export interface IRotaryTimerContext extends ISnapProps, IFeedbackProps {
  size: number;
  ringWidth: number;
  ticksCount: number;
  isEditable?: boolean;
  rotationSharedValue: SharedValue<number>;
  onChange?: (ms: number) => void;

  renderLabel: (rad: number) => string;

  onTouchTimerStart?: (rad: number) => void;
  onTouchTimerEnd?: (rad: number) => void;
}

export interface IRotaryTimerDependencyContext {
  center: number;
  radius: number;
}
