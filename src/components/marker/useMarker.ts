import { useAnimatedStyle } from 'react-native-reanimated';
import { useRotaryTimer } from '../../hooks';
import { normalizeAngle0To2Pi } from '../../helpers';

export const useMarker = () => {
  const { size, ringWidth, rotationSharedValue } = useRotaryTimer();

  const animatedStyle = useAnimatedStyle(() => {
    const progress = normalizeAngle0To2Pi(rotationSharedValue.value);
    const x = size / 2 + ((size - ringWidth) / 2) * Math.sin(progress);
    const y = size / 2 - ((size - ringWidth) / 2) * Math.cos(progress);

    return {
      position: 'absolute',
      transform: [{ translateX: x - size / 2 }, { translateY: y - size / 2 }],
    };
  });

  return animatedStyle;
};
