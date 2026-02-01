import React, { type ReactElement } from 'react';
import Animated from 'react-native-reanimated';
import { Circle } from 'react-native-svg';
import useRotaryTimer from '../hooks/useRotaryTimer';
import useMarker from '../hooks/useMarker';

const AnimatedMarker = Animated.createAnimatedComponent(Circle);

const Marker = (): ReactElement => {
  const { ringWidth } = useRotaryTimer();
  const animatedProps = useMarker();

  return (
    <AnimatedMarker
      r={ringWidth / 2}
      fill={'black'}
      animatedProps={animatedProps}
    />
  );
};

export default React.memo(Marker);
