import Animated, { type AnimatedStyle } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import type { IRotaryTimerContext } from '../../context/types';
import React from 'react';

import type { StyleProp, ViewStyle } from 'react-native';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export interface IMarkerViewProps {
  animatedStyle: StyleProp<AnimatedStyle<ViewStyle>>;
  ringWidth: IRotaryTimerContext['ringWidth'];
}

const MarkerView = ({ animatedStyle, ringWidth }: IMarkerViewProps) => (
  <AnimatedSvg width={ringWidth} height={ringWidth} style={animatedStyle}>
    <Circle
      cx={ringWidth / 2}
      cy={ringWidth / 2}
      r={ringWidth / 2}
      fill={'black'}
    />
  </AnimatedSvg>
);

export default React.memo(MarkerView);
