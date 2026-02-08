import useRotaryTimer from '../../hooks/useRotaryTimer';
import {
  cancelAnimation,
  useAnimatedProps,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';

const INVISIBLE_ARROW_TIME = 300;

const useHint = () => {
  const { rotationSharedValue, hintEnabledRotation, hintHideWhenNotZero } =
    useRotaryTimer();

  const arrowRotationSharedValue = useSharedValue(0);

  useAnimatedReaction(
    () =>
      hintEnabledRotation &&
      ((hintHideWhenNotZero && rotationSharedValue.value === 0) ||
        !hintHideWhenNotZero),
    (shouldSpin, prev) => {
      if (shouldSpin && !prev) {
        arrowRotationSharedValue.value = withRepeat(
          withDelay(1000, withSpring(Math.PI, { duration: 7000 })),
          -1,
          false
        );
      }

      if (!shouldSpin && prev) {
        cancelAnimation(arrowRotationSharedValue);
        arrowRotationSharedValue.value = withDelay(
          INVISIBLE_ARROW_TIME,
          withSpring(0)
        );
      }
    }
  );

  const opacity = useDerivedValue(() => {
    if (!hintHideWhenNotZero) {
      return 1;
    }
    return withSpring(rotationSharedValue.value !== 0 ? 0 : 1, {
      duration: INVISIBLE_ARROW_TIME,
    });
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      opacity: opacity.value,
      transform: [{ rotate: `${arrowRotationSharedValue.value}rad` }],
    };
  });

  return animatedProps;
};

export default useHint;
