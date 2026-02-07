import React from 'react';
import useRotaryTimer from '../../hooks/useRotaryTimer';
import useRing from './useRing';
import RingView, { type IRingViewProps } from './RingView';

export interface IRingProps {
  ViewComponent?: React.ComponentType<IRingViewProps>;
}

const Ring = ({ ViewComponent = RingView }: IRingProps) => {
  const { size, center, radius, ringWidth } = useRotaryTimer();
  const { animatedStyle, animatedProps } = useRing();

  return (
    <ViewComponent
      animatedProps={animatedProps}
      animatedStyle={animatedStyle}
      center={center}
      size={size}
      radius={radius}
      ringWidth={ringWidth}
    />
  );
};

export default React.memo(Ring);
