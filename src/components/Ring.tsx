import React, { type ReactElement } from 'react';
import { Circle } from 'react-native-svg';
import useRotaryTimer from '../hooks/useRotaryTimer';

export const Ring = (): ReactElement => {
  const { center, radius, ringWidth } = useRotaryTimer();
  return (
    <Circle
      cx={center}
      cy={center}
      r={radius}
      stroke={'red'}
      strokeWidth={ringWidth}
      fill="none"
      transform={`rotate(-90 ${center} ${center})`}
    />
  );
};

export default React.memo(Ring);
