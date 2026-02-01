import useRotaryTimer from './useRotaryTimer';
import { useAnimatedReaction } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { TWO_PI } from '../constants/math';
import { normalizeAngle0To2Pi } from '../helper';

const useFeedback = () => {
  const { rotationSharedValue, feedbackTicksCount, onFeedback } =
    useRotaryTimer();

  useAnimatedReaction(
    () => {
      const angle = normalizeAngle0To2Pi(rotationSharedValue.value);
      return Math.floor(angle / (TWO_PI / feedbackTicksCount));
    },
    (currentStep, prevStep) => {
      if (currentStep !== prevStep && onFeedback) {
        scheduleOnRN(onFeedback);
      }
    }
  );
};

export default useFeedback;
