import React from 'react';
import useRotaryTimer from '../hooks/useRotaryTimer';
import { Rect } from 'react-native-svg';

const TICKS_CONFIG = {
  width: 1,
  height: 10,
  extraHeight: 5,
} as const;

interface ITickItemProps {
  index: number;
  angle: number;
}

const TickItem = ({ index, angle }: ITickItemProps) => {
  const { radius, center } = useRotaryTimer();

  const x = center + radius * Math.cos(angle);
  const y = center + radius * Math.sin(angle);
  const rotationDeg = ((angle + Math.PI / 2) * 180) / Math.PI;

  const height =
    index % 5 === 0
      ? TICKS_CONFIG.height + TICKS_CONFIG.extraHeight
      : TICKS_CONFIG.height;
  return (
    <Rect
      x={x - TICKS_CONFIG.width / 2}
      y={y - TICKS_CONFIG.height / 2 + 15}
      width={TICKS_CONFIG.width}
      height={height}
      fill={'#000'}
      transform={`rotate(${rotationDeg} ${x} ${y})`}
    />
  );
};

export default React.memo(TickItem);
