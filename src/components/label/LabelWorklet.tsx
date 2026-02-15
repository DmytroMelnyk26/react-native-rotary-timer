import React from 'react';
import { useLabelWorklet } from './useLabelWorklet';
import { LabelView } from './LabelView';
import { useRotaryTimer } from '../../hooks';
import type { ILabelProps } from './Label';

export const LabelWorklet = React.memo(
  ({ ViewComponent = LabelView }: ILabelProps) => {
    const { labelTextStyle } = useRotaryTimer();

    const animatedProps = useLabelWorklet();

    return (
      <ViewComponent animatedProps={animatedProps} style={labelTextStyle} />
    );
  }
);
