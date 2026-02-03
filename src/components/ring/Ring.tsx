import React from 'react';
import useRotaryTimer from '../../hooks/useRotaryTimer';
import useRing from './useRing';
import RingView, { type IRingViewProps } from './RingView';

export interface IRingProps {
  ViewComponent?: React.ComponentType<IRingViewProps>;
}

const Ring = ({ ViewComponent = RingView }: IRingProps) => {
  const { center, radius, ringWidth } = useRotaryTimer();
  const animatedProps = useRing();

  return (
    <ViewComponent
      animatedProps={animatedProps}
      center={center}
      radius={radius}
      ringWidth={ringWidth}
    />
  );
};

export default React.memo(Ring);
