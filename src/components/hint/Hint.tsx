import React from 'react';
import useHint from './useHint';
import HintView, { type IHintViewProps } from './HintView';
import useRotaryTimer from '../../hooks/useRotaryTimer';

export interface IHintProps {
  ViewComponent?: React.ComponentType<IHintViewProps>;
}

const Hint = ({ ViewComponent = HintView }: IHintProps) => {
  const { size } = useRotaryTimer();
  const animatedProps = useHint();

  return <ViewComponent animatedProps={animatedProps} size={size} />;
};

export default React.memo(Hint);
