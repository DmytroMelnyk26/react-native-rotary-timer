import type { SharedValue } from 'react-native-reanimated';
import type {
  IRotaryTimerBackgroundProps,
  IRotaryTimerCommonProps,
  IRotaryTimerFeedbackProps,
  IRotaryTimerHintProps,
  IRotaryTimerLabelProps,
  IRotaryTimerMarkerProps,
  IRotaryTimerRingProps,
  IRotaryTimerSnapProps,
  IRotaryTimerTicksProps,
} from '../types';

export interface IRotaryTimerContext
  extends IRotaryTimerSnapProps,
    IRotaryTimerFeedbackProps,
    IRotaryTimerTicksProps,
    IRotaryTimerMarkerProps,
    IRotaryTimerLabelProps,
    IRotaryTimerHintProps,
    IRotaryTimerRingProps,
    IRotaryTimerBackgroundProps,
    IRotaryTimerCommonProps {
  rotationSharedValue: SharedValue<number>;
  size: number;
  ringWidth: number;
}
