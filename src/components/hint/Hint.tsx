import React from 'react';
import { useHint } from './useHint';
import { HintView, type IHintViewProps } from './HintView';
import { useRotaryTimer } from '../../hooks';

export interface IHintProps {
  ViewComponent?: React.ComponentType<IHintViewProps>;
}

export const Hint = React.memo(({ ViewComponent = HintView }: IHintProps) => {
  const { hintSize, hintColor } = useRotaryTimer();
  const animatedProps = useHint();

  return (
    <ViewComponent
      animatedProps={animatedProps}
      size={hintSize}
      color={hintColor}
    />
  );
});
