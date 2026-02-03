import React from 'react';
import useLabel from './useLabel';
import LabelView, { type ILabelViewProps } from './LabelView';

export interface ILabelProps {
  ViewComponent?: React.ComponentType<ILabelViewProps>;
}

const Label = ({ ViewComponent = LabelView }: ILabelProps) => {
  const animatedProps = useLabel();

  return <ViewComponent animatedProps={animatedProps} />;
};

export default React.memo(Label);
