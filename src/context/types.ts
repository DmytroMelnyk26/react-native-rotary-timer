import type { SharedValue } from 'react-native-reanimated';
import type {
  IBackgroundExternalProps,
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
    IBackgroundExternalProps,
    ICommonProps {
  rotationSharedValue: SharedValue<number>;
  size: number;
  ringWidth: number;
}
