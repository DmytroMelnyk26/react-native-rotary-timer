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
  rounding?: number;
  color?: string;
}

const TickItemView = ({
  x,
  y,
  rotateX,
  rotateY,
  height,
  width,
  rotationDeg,
  color,
  rounding,
}: ITickItemViewProps) => (
  <Rect
    x={x}
    y={y}
    width={width}
    height={height}
    fill={color}
    rx={rounding}
    ry={rounding}
    transform={`rotate(${rotationDeg} ${rotateX} ${rotateY})`}
  />
);

export default React.memo(TickItemView);
