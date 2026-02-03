import useRotaryTimer from '../../hooks/useRotaryTimer';
import { useAnimatedProps } from 'react-native-reanimated';
import { TWO_PI } from '../../constants/math';
import { normalizeAngle0To2Pi } from '../../helper';

const useRing = () => {
  const { radius, rotationSharedValue } = useRotaryTimer();

  const animatedProps = useAnimatedProps(() => {
    const fullRotations = Math.floor(rotationSharedValue.value / TWO_PI);
    const remainder = normalizeAngle0To2Pi(rotationSharedValue.value);
    const remainderLength = (remainder / TWO_PI) * TWO_PI * radius;
    const dashLength = fullRotations * TWO_PI * radius + remainderLength;
    const dashLengthSafe = dashLength === 0 ? 0.001 : dashLength;
    const gapLength = TWO_PI * radius * 10;

    return {
      strokeDasharray: `${dashLengthSafe} ${gapLength}`,
      strokeDashoffset: 0,
    };
  });

  return animatedProps;
};

export default useRing;
