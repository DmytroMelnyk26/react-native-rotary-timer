import Animated, { type AnimatedProps } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import React from 'react';
import { StyleSheet } from 'react-native';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export interface IRingViewProps {
  animatedProps: AnimatedProps<typeof AnimatedCircle>;
  center: number;
  size: number;
  radius: number;
  ringWidth: number;
}

const RingView = ({
  animatedProps,
  center,
  size,
  radius,
  ringWidth,
}: IRingViewProps) => (
  <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
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
  </Svg>
);

export default React.memo(RingView);
