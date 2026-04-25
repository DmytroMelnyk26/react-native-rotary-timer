import {
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import { useRotaryTimerCore } from '../../hooks';
import { normalizeAngle0To2Pi } from '../../helpers';
import { TWO_PI } from '../../constants';

export const useRing = () => {
  const { size, ringWidth, rotationSharedValue } = useRotaryTimerCore();

  const animatedRotationSharedValue = useDerivedValue(() => {
    return withSpring(rotationSharedValue.value);
  });

  const animatedProps = useAnimatedProps(() => {
    const radius = (size - ringWidth) / 2;
    const circumference = TWO_PI * radius;
    const absRotations = Math.abs(animatedRotationSharedValue.value);
    const fullRotations = Math.floor(absRotations / TWO_PI);
    const remainder = normalizeAngle0To2Pi(absRotations);
    const remainderLength = remainder * radius;
    const dashLength = fullRotations * TWO_PI * radius + remainderLength;
    const effectiveDash = Math.min(dashLength, circumference);

    return {
      strokeDasharray: `${circumference} ${circumference}`,
      strokeDashoffset: 2 * circumference - effectiveDash,
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    const isNegative = animatedRotationSharedValue.value < 0;
    const absRotation = Math.abs(animatedRotationSharedValue.value);
    const excessRadians = Math.max(0, absRotation - TWO_PI);
    const rotateDeg = (excessRadians * 180) / Math.PI;

    return {
      transform: [
        { scaleX: isNegative ? -1 : 1 },
        { rotate: `${rotateDeg}deg` },
      ],
    };
  });

  return { animatedStyle, animatedProps };
};
