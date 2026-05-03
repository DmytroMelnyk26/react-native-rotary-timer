import React from 'react';
import { useRing } from './useRing';
import { RingView, type IRingViewProps } from './RingView';
import { useRotaryTimerAppearance, useRotaryTimerCore } from '../../hooks';

export interface IRingProps {
  ViewComponent?: React.ComponentType<IRingViewProps>;
}

export const Ring = React.memo(({ ViewComponent = RingView }: IRingProps) => {
  const { size, ringWidth } = useRotaryTimerCore();
  const { ringInactiveColor } = useRotaryTimerAppearance();
  const { animatedStyle, animatedProps, animatedTipProps, colors } = useRing();

  return (
    <ViewComponent
      animatedProps={animatedProps}
      animatedTipProps={animatedTipProps}
      animatedStyle={animatedStyle}
      size={size}
      width={ringWidth}
      colors={colors}
      inactiveColor={ringInactiveColor}
    />
  );
});
