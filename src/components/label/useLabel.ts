import { useCallback, useState } from 'react';
import {
  useAnimatedProps,
  useAnimatedReaction,
  useDerivedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { useRotaryTimerCore, useRotaryTimerAppearance } from '../../hooks';

export const useLabel = () => {
  const [text, setText] = useState('');
  const { rotationSharedValue } = useRotaryTimerCore();
  const { labelHideWhenZero, renderLabel } = useRotaryTimerAppearance();

  const updateText = useCallback(
    (value: number) => {
      setText(renderLabel?.(value) || '');
    },
    [renderLabel]
  );

  const animatedRotationSharedValue = useDerivedValue(() => {
    return withTiming(rotationSharedValue.value);
  });

  useAnimatedReaction(
    () => animatedRotationSharedValue.value,
    (value) => {
      scheduleOnRN(updateText, value);
    }
  );

  const opacitySharedValue = useDerivedValue(() => {
    return labelHideWhenZero
      ? withSpring(rotationSharedValue.value === 0 ? 0 : 1)
      : 1;
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      text: text,
      defaultValue: text,
      opacity: opacitySharedValue.value,
    };
  });

  return animatedProps;
};
