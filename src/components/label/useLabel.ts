import useRotaryTimer from '../../hooks/useRotaryTimer';
import {
  useAnimatedProps,
  useAnimatedReaction,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import { useCallback, useState } from 'react';
import { scheduleOnRN } from 'react-native-worklets';

const useLabel = () => {
  const [text, setText] = useState('');
  const { rotationSharedValue, labelHideOnZero, renderLabel } =
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
    return labelHideOnZero
      ? withSpring(rotationSharedValue.value === 0 ? 0 : 1)
      : 1;
  }, [labelHideOnZero]);

  const animatedProps = useAnimatedProps(() => {
    return {
      text: text,
      defaultValue: text,
      opacity: opacitySharedValue.value,
    };
  }, [text]);

  return animatedProps;
};

export default useLabel;
