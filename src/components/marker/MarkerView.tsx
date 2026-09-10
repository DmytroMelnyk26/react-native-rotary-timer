import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, { type AnimatedStyle } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import type { IRotaryTimerContext } from '../../context';

export interface IMarkerViewProps {
  animatedStyle: StyleProp<AnimatedStyle<ViewStyle>>;
  size?: IRotaryTimerContext['ringWidth'];
  color?: string;
}

export const MarkerView = React.memo(
  ({ animatedStyle, size = 0, color }: IMarkerViewProps) => (
    <Animated.View style={animatedStyle}>
      <Svg width={size} height={size}>
        <Circle cx={size / 2} cy={size / 2} r={size / 2} fill={color} />
      </Svg>
    </Animated.View>
  )
);
