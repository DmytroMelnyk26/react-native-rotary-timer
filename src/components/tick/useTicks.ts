import { useMemo } from 'react';
import { TWO_PI } from '../../constants';
import { useRotaryTimer, useStepAngle } from '../../hooks';

export const useTicks = () => {
  const { ticksCount, tickAngle, tickOffsetAngle } = useRotaryTimer();

  const angleStep = useStepAngle(tickAngle, ticksCount);

  const ticks = useMemo(() => {
    const count = angleStep ? Math.round(TWO_PI / angleStep) : 0;

    return Array.from({ length: count }, (_, index) => {
      return {
        index,
        angle: index * angleStep + (tickOffsetAngle || 0) - Math.PI / 2,
      };
    });
  }, [angleStep, tickOffsetAngle]);

  return ticks;
};
