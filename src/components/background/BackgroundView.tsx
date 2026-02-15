import React from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';
import Animated, { type AnimatedStyle } from 'react-native-reanimated';

export interface IBackgroundViewProps {
  color?: string;
  size?: number;
  style?: AnimatedStyle<ViewStyle>;
}

export const BackgroundView = React.memo(
  ({ color, size, style }: IBackgroundViewProps) => (
    <Animated.View
      style={[
        styles.background,
        {
          backgroundColor: color,
          width: size,
          height: size,
          borderRadius: (size || 0) / 2,
        },
        style,
      ]}
    />
  )
);

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
  },
});
