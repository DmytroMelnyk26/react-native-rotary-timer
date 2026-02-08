import type { SharedValue } from 'react-native-reanimated';
import type {
  IFeedbackProps,
  IMarkerExternalProps,
  ISnapProps,
  ITicksExternalProps,
} from '../types';

export interface IRotaryTimerContext
  extends ISnapProps,
    IFeedbackProps,
    ITicksExternalProps,
    IMarkerExternalProps {
  size: number;
  ringWidth: number;
  isEditable?: boolean;
  rotationSharedValue: SharedValue<number>;
  minRotation?: number;
  maxRotation?: number;

  onChange?: (ms: number) => void;

  renderLabel: (rad: number) => string;

  onTouchTimerStart?: (rad: number) => void;
  onTouchTimerEnd?: (rad: number) => void;
}

export interface IRotaryTimerDependencyContext {
  center: number;
  radius: number;
}
