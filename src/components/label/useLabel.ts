import useRotaryTimer from '../../hooks/useRotaryTimer';
import { useAnimatedProps } from 'react-native-reanimated';

const useLabel = () => {
  const { rotationSharedValue, renderLabel } = useRotaryTimer();

  const animatedProps = useAnimatedProps(() => {
    const value = renderLabel?.(rotationSharedValue.value);
    return {
      text: value,
      defaultValue: value,
    };
  });

  return animatedProps;
};

export default useLabel;
