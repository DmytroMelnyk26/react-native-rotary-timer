import React, { type ReactElement } from 'react';
import { Circle } from 'react-native-svg';
import useRotaryTimer from '../hooks/useRotaryTimer';
import Animated from 'react-native-reanimated';
import useRing from '../hooks/useRing';

const AnimatedRing = Animated.createAnimatedComponent(Circle);

const Ring = (): ReactElement => {
  const { center, radius, ringWidth } = useRotaryTimer();
  const animatedProps = useRing();

  return (
    <>
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke={'#ccc'}
        strokeWidth={ringWidth}
        fill="none"
        transform={`rotate(-90 ${center} ${center})`}
      />
      <AnimatedRing
        cx={center}
        cy={center}
        r={radius}
        stroke={'red'}
        strokeWidth={ringWidth}
        strokeLinecap="round"
        animatedProps={animatedProps}
        fill="none"
        transform={`rotate(-90 ${center} ${center})`}
      />
    </>
  );
};

export default React.memo(Ring);
