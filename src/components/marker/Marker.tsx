import React from 'react';
import { useMarker } from './useMarker';
import { MarkerView, type IMarkerViewProps } from './MarkerView';
import { useRotaryTimerAppearance } from '../../hooks';

export interface IMarkerProps {
  ViewComponent?: React.ComponentType<IMarkerViewProps>;
}

export const Marker = ({ ViewComponent = MarkerView }: IMarkerProps) => {
  const { markerSize, markerColor } = useRotaryTimerAppearance();
  const animatedStyle = useMarker();

  return (
    <ViewComponent
      animatedStyle={animatedStyle}
      size={markerSize}
      color={markerColor}
    />
  );
};
