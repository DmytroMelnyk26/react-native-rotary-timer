import React from 'react';
import useRotaryTimer from '../../hooks/useRotaryTimer';
import useMarker from './useMarker';
import MarkerView, { type IMarkerViewProps } from './MarkerView';

export interface IMarkerProps {
  ViewComponent?: React.ComponentType<IMarkerViewProps>;
}

const Marker = ({ ViewComponent = MarkerView }: IMarkerProps) => {
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

export default React.memo(Marker);
