import useRotaryTimer from '../../hooks/useRotaryTimer';
import { useAnimatedProps, useAnimatedReaction } from 'react-native-reanimated';
import { useCallback, useState } from 'react';
import { scheduleOnRN } from 'react-native-worklets';

const useLabel = () => {
  const [text, setText] = useState('');
  const { rotationSharedValue, renderLabel } = useRotaryTimer();

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

  const animatedProps = useAnimatedProps(() => {
    return {
      text: text,
      defaultValue: text,
    };
  }, [text]);

  return animatedProps;
};

export default useLabel;
