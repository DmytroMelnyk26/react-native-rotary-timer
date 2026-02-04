import Animated, { type AnimatedProps } from 'react-native-reanimated';
import { Circle } from 'react-native-svg';
import type { IRotaryTimerContext } from '../../context/types';
import React from 'react';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export interface IMarkerViewProps {
  animatedProps: AnimatedProps<typeof AnimatedCircle>;
  ringWidth: IRotaryTimerContext['ringWidth'];
}

const MarkerView = ({ animatedProps, ringWidth }: IMarkerViewProps) => (
  <AnimatedCircle
    r={ringWidth / 2}
    fill={'black'}
    animatedProps={animatedProps}
  />
);

export default React.memo(MarkerView);
