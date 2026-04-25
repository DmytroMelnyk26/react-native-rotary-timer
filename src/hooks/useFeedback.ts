import { useAnimatedReaction } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { useStepAngle } from './useStepAngle';
import { normalizeAngle0To2Pi } from '../helpers';
import {
  useRotaryTimerCore,
  useRotaryTimerCallbacks,
  useRotaryTimerFeedback,
} from './useRotaryTimerContexts';

export const useFeedback = () => {
  const { rotationSharedValue } = useRotaryTimerCore();
  const { onFeedback } = useRotaryTimerCallbacks();
  const { feedbackAngle, feedbackOffsetAngle, feedbackTicksCount } =
    useRotaryTimerFeedback();

  const stepFeedback = useStepAngle(feedbackAngle, feedbackTicksCount);

  useAnimatedReaction(
    () => {
      if (!stepFeedback) {
        return 0;
      }

      const angle = normalizeAngle0To2Pi(
        rotationSharedValue.value + (feedbackOffsetAngle || 0)
      );

      return Math.round(angle / stepFeedback);
    },
    (currentStep, prevStep) => {
      if (currentStep !== prevStep && prevStep != null && onFeedback) {
        scheduleOnRN(onFeedback);
      }
    }
  );
};
