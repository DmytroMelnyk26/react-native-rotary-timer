import React from 'react';
import useLabel from './useLabel';
import LabelView, { type ILabelViewProps } from './LabelView';
import useRotaryTimer from '../../hooks/useRotaryTimer';

export interface ILabelProps {
  ViewComponent?: React.ComponentType<ILabelViewProps>;
}

const Label = ({ ViewComponent = LabelView }: ILabelProps) => {
  const { labelTextStyle } = useRotaryTimer();

  const animatedProps = useLabel();

  return <ViewComponent animatedProps={animatedProps} style={labelTextStyle} />;
};

export default React.memo(Label);
