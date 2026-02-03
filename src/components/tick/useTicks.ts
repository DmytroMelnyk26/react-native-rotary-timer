import { useMemo } from 'react';
import { TWO_PI } from '../../constants/math';
import useRotaryTimer from '../../hooks/useRotaryTimer';

const useTicks = () => {
  const { ticksCount } = useRotaryTimer();

  const ticks = useMemo(
    () =>
      Array.from({ length: ticksCount }, (_, index) => {
        const angleStep = TWO_PI / ticksCount;
        return { index, angle: index * angleStep - Math.PI / 2 };
      }),
    [ticksCount]
  );

  return ticks;
};

export default useTicks;
