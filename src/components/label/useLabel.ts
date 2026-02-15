import { useCallback, useState } from 'react';
import {
  useAnimatedProps,
  useAnimatedReaction,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { useRotaryTimer } from '../../hooks';

export const useLabel = () => {
  const [text, setText] = useState('');
  const { rotationSharedValue, labelHideWhenZero, renderLabel } =
    useRotaryTimer();

  const updateText = useCallback(
    (value: number) => {
      setText(renderLabel?.(value) || '');
    },
    [renderLabel]
  );

  useAnimatedReaction(
    () => rotationSharedValue.value,
    () => {
      scheduleOnRN(updateText, rotationSharedValue.value);
    }
  );

  const opacitySharedValue = useDerivedValue(() => {
    return labelHideWhenZero
      ? withSpring(rotationSharedValue.value === 0 ? 0 : 1)
      : 1;
  }, [labelHideWhenZero]);

  const animatedProps = useAnimatedProps(() => {
    return {
      text: text,
      defaultValue: text,
      opacity: opacitySharedValue.value,
    };
  }, [text]);

  return animatedProps;
};
