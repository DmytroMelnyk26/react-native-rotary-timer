import React from 'react';
import useRotaryTimer from '../../hooks/useRotaryTimer';
import useRing from './useRing';
import RingView, { type IRingViewProps } from './RingView';

export interface IRingProps {
  ViewComponent?: React.ComponentType<IRingViewProps>;
}

const Ring = ({ ViewComponent = RingView }: IRingProps) => {
  const { size, ringWidth, ringActiveColor, ringInactiveColor } =
    useRotaryTimer();
  const { animatedStyle, animatedProps } = useRing();

  return (
    <ViewComponent
      animatedProps={animatedProps}
      animatedStyle={animatedStyle}
      size={size}
      width={ringWidth}
      activeColor={ringActiveColor}
      inactiveColor={ringInactiveColor}
    />
  );
};

export default React.memo(Ring);
