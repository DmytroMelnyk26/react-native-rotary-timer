import type { SharedValue } from 'react-native-reanimated';
import type {
  ICommonProps,
  IFeedbackProps,
  IHintExternalProps,
  ILabelExternalProps,
  IMarkerExternalProps,
  IRingExternalProps,
  ISnapProps,
  ITicksExternalProps,
} from '../types';

export interface IRotaryTimerContext
  extends ISnapProps,
    IFeedbackProps,
    ITicksExternalProps,
    IMarkerExternalProps,
    ILabelExternalProps,
    IHintExternalProps,
    IRingExternalProps,
    Omit<ICommonProps, 'initialRotation'> {
  rotationSharedValue: SharedValue<number>;
  size: number;
  ringWidth: number;
}
