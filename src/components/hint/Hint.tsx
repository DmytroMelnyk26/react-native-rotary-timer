import React from 'react';
import useHint from './useHint';
import HintView, { type IHintViewProps } from './HintView';

export interface IHintProps {
  ViewComponent?: React.ComponentType<IHintViewProps>;
}

const Hint = ({ ViewComponent = HintView }: IHintProps) => {
  const animatedProps = useHint();

  return <ViewComponent animatedProps={animatedProps} />;
};

export default React.memo(Hint);
