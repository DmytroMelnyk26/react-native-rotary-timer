import {
  useAnimatedProps,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { useRotaryTimerCore, useRotaryTimerAppearance } from '../../hooks';

export const useLabelWorklet = () => {
  const { rotationSharedValue, isDraggingSharedValue } = useRotaryTimerCore();
  const { renderLabel } = useRotaryTimerAppearance();

  const animatedRotationSharedValue = useDerivedValue(() => {
    return isDraggingSharedValue.value
      ? rotationSharedValue.value
      : withTiming(rotationSharedValue.value);
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
