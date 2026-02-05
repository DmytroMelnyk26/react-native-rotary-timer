import useRotaryTimer from '../../hooks/useRotaryTimer';
import { useAnimatedProps, useDerivedValue } from 'react-native-reanimated';

const useLabel = () => {
  const { rotationSharedValue, renderLabel } = useRotaryTimer();

  const textSharedValue = useDerivedValue(() => {
    return renderLabel?.(rotationSharedValue.value) || '123213';
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      text: textSharedValue.value,
      defaultValue: textSharedValue.value,
    };
  });

  return animatedProps;
};

export default useLabel;
