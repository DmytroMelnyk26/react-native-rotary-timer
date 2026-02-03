import { Rect } from 'react-native-svg';
import React from 'react';

export interface ITickItemViewProps {
  x: number;
  y: number;
  rotateX: number;
  rotateY: number;
  height: number;
  width: number;
  rotationDeg: number;
}

const TickItemView = ({
  x,
  y,
  rotateX,
  rotateY,
  height,
  width,
  rotationDeg,
}: ITickItemViewProps) => {
  return (
    <Rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={'#000'}
      transform={`rotate(${rotationDeg} ${rotateX} ${rotateY})`}
    />
  );
};

export default React.memo(TickItemView);
