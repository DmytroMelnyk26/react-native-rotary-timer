import React from 'react';
import { useRotaryTimerCore, useRotaryTimerAppearance } from '../../hooks';
import { useRing } from './useRing';
import { RingView, type IRingViewProps } from './RingView';

export interface IRingProps {
  ViewComponent?: React.ComponentType<IRingViewProps>;
}

export const Ring = React.memo(({ ViewComponent = RingView }: IRingProps) => {
  const { size, ringWidth } = useRotaryTimerCore();
  const { ringActiveColor, ringInactiveColor } = useRotaryTimerAppearance();
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
});
