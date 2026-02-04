import useRotaryTimer from '../../hooks/useRotaryTimer';
import { useAnimatedStyle } from 'react-native-reanimated';
import { normalizeAngle0To2Pi } from '../../helper';

const useMarker = () => {
  const { center, radius, rotationSharedValue } = useRotaryTimer();

  const animatedStyle = useAnimatedStyle(() => {
    const progress = normalizeAngle0To2Pi(rotationSharedValue.value);
    const x = center + radius * Math.sin(progress);
    const y = center - radius * Math.cos(progress);

    return {
      position: 'absolute',
      transform: [{ translateX: x - center }, { translateY: y - center }],
    };
  });

  return animatedStyle;
};

export default useMarker;
