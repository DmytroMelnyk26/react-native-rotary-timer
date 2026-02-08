import useRotaryTimer from '../../hooks/useRotaryTimer';
import { useAnimatedProps, useAnimatedStyle } from 'react-native-reanimated';
import { TWO_PI } from '../../constants/math';
import { normalizeAngle0To2Pi } from '../../helper';

const useRing = () => {
  const { size, ringWidth, rotationSharedValue } = useRotaryTimer();

  const animatedProps = useAnimatedProps(() => {
    const radius = (size - ringWidth) / 2;
    const absRotations = Math.abs(rotationSharedValue.value);
    const fullRotations = Math.floor(absRotations / TWO_PI);
    const remainder = normalizeAngle0To2Pi(absRotations);
    const remainderLength = remainder * radius;
    const dashLength = fullRotations * TWO_PI * radius + remainderLength;
    const dashLengthSafe = dashLength === 0 ? 0.001 : dashLength;
    const gapLength = TWO_PI * radius * 10;

    return {
      strokeDasharray: `${dashLengthSafe} ${gapLength}`,
      strokeDashoffset: 0,
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    const isNegative = rotationSharedValue.value < 0;
    return { transform: [{ scaleX: isNegative ? -1 : 1 }] };
  });

  return { animatedStyle, animatedProps };
};

export default useRing;
