import React from 'react';
import { useMarker } from './useMarker';
import { MarkerView, type IMarkerViewProps } from './MarkerView';
import { useRotaryTimer } from '../../hooks';

export interface IMarkerProps {
  ViewComponent?: React.ComponentType<IMarkerViewProps>;
}

export const Marker = ({ ViewComponent = MarkerView }: IMarkerProps) => {
  const { markerSize, markerColor } = useRotaryTimer();
  const animatedStyle = useMarker();

  return (
    <ViewComponent
      animatedStyle={animatedStyle}
      size={markerSize}
      color={markerColor}
    />
  );
};
