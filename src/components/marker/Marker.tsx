import React from 'react';
import useRotaryTimer from '../../hooks/useRotaryTimer';
import useMarker from './useMarker';
import MarkerView, { type IMarkerViewProps } from './MarkerView';

export interface IMarkerProps {
  ViewComponent?: React.ComponentType<IMarkerViewProps>;
}

const Marker = ({ ViewComponent = MarkerView }: IMarkerProps) => {
  const { ringWidth } = useRotaryTimer();
  const animatedStyle = useMarker();

  return <ViewComponent animatedStyle={animatedStyle} ringWidth={ringWidth} />;
};

export default React.memo(Marker);
