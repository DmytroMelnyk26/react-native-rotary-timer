import { useAnimatedProps, useDerivedValue } from 'react-native-reanimated';
import { useRotaryTimer } from '../../hooks';

export const useLabelWorklet = () => {
  const { rotationSharedValue, renderLabel } = useRotaryTimer();

  const textSharedValue = useDerivedValue(() => {
    return renderLabel?.(rotationSharedValue.value) || '';
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      text: textSharedValue.value,
      defaultValue: textSharedValue.value,
    };
  });

  return animatedProps;
};
