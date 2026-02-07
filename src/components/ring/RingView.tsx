import Animated, {
  type AnimatedProps,
  type AnimatedStyle,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import React from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export interface IRingViewProps {
  animatedProps: AnimatedProps<typeof AnimatedCircle>;
  animatedStyle: AnimatedStyle<ViewStyle>;
  center: number;
  size: number;
  radius: number;
  ringWidth: number;
}

const RingView = ({
  animatedProps,
  animatedStyle,
  center,
  size,
  radius,
  ringWidth,
}: IRingViewProps) => (
  <AnimatedSvg
    width={size}
    height={size}
    style={[StyleSheet.absoluteFill, animatedStyle]}
  >
    <Circle
      cx={center}
      cy={center}
      r={radius}
      stroke={'#ccc'}
      strokeWidth={ringWidth}
      fill="none"
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
      // transform={`translate(0, ${
      //   2 * center
      // }) scale(1, -1) rotate(90 ${center} ${center})`}
      transform={`rotate(-90 ${center} ${center})`}
    />
  </AnimatedSvg>
);

export default React.memo(RingView);
