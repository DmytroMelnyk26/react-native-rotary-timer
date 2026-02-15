import React from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  type AnimatedProps,
  type AnimatedStyle,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export interface IRingViewProps {
  animatedProps: AnimatedProps<typeof AnimatedCircle>;
  animatedStyle: AnimatedStyle<ViewStyle>;
  size: number;
  width: number;
  activeColor?: string;
  inactiveColor?: string;
}

export const RingView = React.memo(
  ({
    animatedProps,
    animatedStyle,
    size,
    width,
    activeColor,
    inactiveColor,
  }: IRingViewProps) => (
    <AnimatedSvg
      width={size}
      height={size}
      style={[StyleSheet.absoluteFill, animatedStyle]}
    >
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={(size - width) / 2}
        stroke={inactiveColor}
        strokeWidth={width}
        fill="none"
      />
      <AnimatedCircle
        cx={size / 2}
        cy={size / 2}
        r={(size - width) / 2}
        stroke={activeColor}
        strokeWidth={width}
        strokeLinecap="round"
        animatedProps={animatedProps}
        fill="none"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </AnimatedSvg>
  )
);
