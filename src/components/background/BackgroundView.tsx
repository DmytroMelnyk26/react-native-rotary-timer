import { StyleSheet, type ViewStyle } from 'react-native';
import React from 'react';
import Animated, { type AnimatedStyle } from 'react-native-reanimated';

export interface IBackgroundViewProps {
  color?: string;
  size?: number;
  style?: AnimatedStyle<ViewStyle>;
}

const BackgroundView = ({ color, size, style }: IBackgroundViewProps) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
  },
});

export default React.memo(BackgroundView);
