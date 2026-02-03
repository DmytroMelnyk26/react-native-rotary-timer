import React from 'react';
import TickItemView, { type ITickItemViewProps } from './TickItemView';
import useTickItem from './useTickItem';

export interface ITickItemProps {
  index: number;
  angle: number;
  ViewComponent?: React.ComponentType<ITickItemViewProps>;
}

const TickItem = ({
  index,
  angle,
  ViewComponent = TickItemView,
}: ITickItemProps) => {
  const { x, y, height, width, rotationDeg, rotateY, rotateX } = useTickItem(
    index,
    angle
  );

  return (
    <ViewComponent
      x={x}
      y={y}
      rotateX={rotateX}
      rotateY={rotateY}
      height={height}
      width={width}
      rotationDeg={rotationDeg}
    />
  );
};

export default React.memo(TickItem);
