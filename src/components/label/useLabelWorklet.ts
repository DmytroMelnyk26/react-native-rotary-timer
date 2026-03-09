import {
  useAnimatedProps,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { useRotaryTimer } from '../../hooks';

export const useLabelWorklet = () => {
  const { rotationSharedValue, renderLabel } = useRotaryTimer();

  const animatedRotationSharedValue = useDerivedValue(() => {
    return withTiming(rotationSharedValue.value);
  });

  const textSharedValue = useDerivedValue(() => {
    return renderLabel?.(animatedRotationSharedValue.value) || '';
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      text: textSharedValue.value,
      defaultValue: textSharedValue.value,
    };
  });

  return animatedProps;
};
