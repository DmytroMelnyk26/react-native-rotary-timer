import useRotaryTimer from '../../hooks/useRotaryTimer';
import { useAnimatedProps } from 'react-native-reanimated';
import { normalizeAngle0To2Pi } from '../../helper';

const useMarker = () => {
  const { center, radius, rotationSharedValue } = useRotaryTimer();

  const animatedProps = useAnimatedProps(() => {
    const progress = normalizeAngle0To2Pi(rotationSharedValue.value);
    const x = center + radius * Math.sin(progress);
    const y = center - radius * Math.cos(progress);

    return {
      cx: x,
      cy: y,
    };
  });

  return animatedProps;
};

export default useMarker;
