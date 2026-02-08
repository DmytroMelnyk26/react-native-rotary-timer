import React from 'react';
import useHint from './useHint';
import HintView, { type IHintViewProps } from './HintView';
import useRotaryTimer from '../../hooks/useRotaryTimer';

export interface IHintProps {
  ViewComponent?: React.ComponentType<IHintViewProps>;
}

const Hint = ({ ViewComponent = HintView }: IHintProps) => {
  const { hintSize, hintColor } = useRotaryTimer();
  const animatedProps = useHint();

  return (
    <ViewComponent
      animatedProps={animatedProps}
      size={hintSize}
      color={hintColor}
    />
  );
};

export default React.memo(Hint);
