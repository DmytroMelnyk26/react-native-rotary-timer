import React from 'react';
import { useLabel } from './useLabel';
import { LabelView, type ILabelViewProps } from './LabelView';
import { useRotaryTimerAppearance } from '../../hooks';

export interface ILabelProps {
  ViewComponent?: React.ComponentType<ILabelViewProps>;
}

export const Label = React.memo(
  ({ ViewComponent = LabelView }: ILabelProps) => {
    const { labelTextStyle } = useRotaryTimerAppearance();

    const animatedProps = useLabel();

    return (
      <ViewComponent animatedProps={animatedProps} style={labelTextStyle} />
    );
  }
);
