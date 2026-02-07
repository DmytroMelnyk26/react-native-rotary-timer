import { useMemo } from 'react';
import { TWO_PI } from '../../constants/math';
import useRotaryTimer from '../../hooks/useRotaryTimer';
import useStepAngle from '../../hooks/useStepAngle';

const useTicks = () => {
  const { ticksCount, tickAngle, tickOffsetAngle } = useRotaryTimer();

  const angleStep = useStepAngle(tickAngle, ticksCount);

  const ticks = useMemo(() => {
    const count = angleStep ? Math.floor(TWO_PI / angleStep) : 0;

    return Array.from({ length: count }, (_, index) => {
      return {
        index,
        angle: index * angleStep + (tickOffsetAngle || 0),
      };
    });
  }, [angleStep, tickOffsetAngle]);

  return ticks;
};

export default useTicks;
