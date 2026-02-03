import Animated, { type AnimatedProps } from 'react-native-reanimated';
import { Circle } from 'react-native-svg';
import React from 'react';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export interface IRingViewProps {
  animatedProps: AnimatedProps<typeof AnimatedCircle>;
  center: number;
  radius: number;
  ringWidth: number;
}

const RingView = ({
  animatedProps,
  center,
  radius,
  ringWidth,
}: IRingViewProps) => (
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
    <AnimatedCircle
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

export default React.memo(RingView);
