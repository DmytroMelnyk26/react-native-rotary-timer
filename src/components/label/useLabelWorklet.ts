import {
  useAnimatedProps,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { useRotaryTimerCore, useRotaryTimerAppearance } from '../../hooks';

export const useLabelWorklet = () => {
  const { rotationSharedValue } = useRotaryTimerCore();
  const { renderLabel } = useRotaryTimerAppearance();

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
