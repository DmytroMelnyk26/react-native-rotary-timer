import React from 'react';
import LabelView, { type ILabelViewProps } from './LabelView';
import useLabelWorklet from './useLabelWorklet';
import useRotaryTimer from '../../hooks/useRotaryTimer';

export interface ILabelProps {
  ViewComponent?: React.ComponentType<ILabelViewProps>;
}

const LabelWorklet = ({ ViewComponent = LabelView }: ILabelProps) => {
  const { labelTextStyle } = useRotaryTimer();

  const animatedProps = useLabelWorklet();

  return <ViewComponent animatedProps={animatedProps} style={labelTextStyle} />;
};

export default React.memo(LabelWorklet);
