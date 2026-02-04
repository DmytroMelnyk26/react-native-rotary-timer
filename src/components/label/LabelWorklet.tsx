import React from 'react';
import LabelView, { type ILabelViewProps } from './LabelView';
import useLabelWorklet from './useLabelWorklet';

export interface ILabelProps {
  ViewComponent?: React.ComponentType<ILabelViewProps>;
}

const LabelWorklet = ({ ViewComponent = LabelView }: ILabelProps) => {
  const animatedProps = useLabelWorklet();

  return <ViewComponent animatedProps={animatedProps} />;
};

export default React.memo(LabelWorklet);
