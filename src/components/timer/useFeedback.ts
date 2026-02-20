import { useAnimatedReaction } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { useRotaryTimer, useStepAngle } from '../../hooks';
import { normalizeAngle0To2Pi } from '../../helpers';

export const useFeedback = () => {
  const {
    rotationSharedValue,
    feedbackAngle,
    feedbackOffsetAngle,
    feedbackTicksCount,
    onFeedback,
  } = useRotaryTimer();

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
