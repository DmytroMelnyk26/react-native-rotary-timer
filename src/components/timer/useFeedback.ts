import useRotaryTimer from '../../hooks/useRotaryTimer';
import { useAnimatedReaction } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { normalizeAngle0To2Pi } from '../../helper';
import useStepAngle from '../../hooks/useStepAngle';

const useFeedback = () => {
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

      return Math.floor(angle / stepFeedback);
    },
    (currentStep, prevStep) => {
      if (currentStep !== prevStep && prevStep != null && onFeedback) {
        scheduleOnRN(onFeedback);
      }
    }
  );
};

export default useFeedback;
