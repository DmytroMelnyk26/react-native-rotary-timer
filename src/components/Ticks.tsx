import React, { type ReactElement, useMemo } from 'react';
import useRotaryTimer from '../hooks/useRotaryTimer';
import { TWO_PI } from '../constants/math';
import TickItem from './TickItem';

type Tick = { index: number; angle: number };

const Ticks = (): ReactElement => {
  const { ticksCount } = useRotaryTimer();

  const TICKS: Tick[] = useMemo(
    () =>
      Array.from({ length: ticksCount }, (_, index) => {
        const angleStep = TWO_PI / ticksCount;
        return { index, angle: index * angleStep - Math.PI / 2 };
      }),
    [ticksCount]
  );

  return (
    <>
      {TICKS.map((tick) => (
        <TickItem key={tick.index} index={tick.index} angle={tick.angle} />
      ))}
    </>
  );
};

export default React.memo(Ticks);
