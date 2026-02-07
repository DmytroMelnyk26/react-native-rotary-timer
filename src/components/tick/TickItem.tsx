import React from 'react';
import TickItemView, { type ITickItemViewProps } from './TickItemView';
import useTickItem from './useTickItem';
import useRotaryTimer from '../../hooks/useRotaryTimer';

export interface ITickItemProps {
  index: number;
  angle: number;
  ViewComponent?: React.ComponentType<ITickItemViewProps>;
}

const TickItem = ({ angle, ViewComponent = TickItemView }: ITickItemProps) => {
  const { tickRounding, tickColor } = useRotaryTimer();
  const { x, y, height, width, rotationDeg, rotateY, rotateX } =
    useTickItem(angle);

  return (
    <ViewComponent
      x={x}
      y={y}
      rotateX={rotateX}
      rotateY={rotateY}
      height={height}
      width={width}
      rotationDeg={rotationDeg}
      rounding={tickRounding}
      color={tickColor}
    />
  );
};

export default React.memo(TickItem);
