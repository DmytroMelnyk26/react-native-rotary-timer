import React from 'react';
import { TickItemView, type ITickItemViewProps } from './TickItemView';
import { useTickItem } from './useTickItem';
import { useRotaryTimer } from '../../hooks';

export interface ITickItemProps {
  index: number;
  angle: number;
  ViewComponent?: React.ComponentType<ITickItemViewProps>;
}

export const TickItem = React.memo(
  ({ angle, ViewComponent = TickItemView }: ITickItemProps) => {
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
  }
);
