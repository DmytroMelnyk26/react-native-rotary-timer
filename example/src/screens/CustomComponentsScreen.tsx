import React from 'react';
import { View, StyleSheet, Text, type ViewStyle } from 'react-native';
import Animated, { type AnimatedStyle } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { Rect } from 'react-native-svg';
import RotaryTimer from 'react-native-rotary-timer';

interface ICustomTickViewProps {
  x: number;
  y: number;
  rotateX: number;
  rotateY: number;
  height: number;
  width: number;
  rotationDeg: number;
  rounding?: number;
  color?: string;
}

const CustomTickItemView = React.memo(
  ({
    x,
    y,
    rotateX,
    rotateY,
    height,
    width,
    rotationDeg,
    color,
    rounding,
  }: ICustomTickViewProps) => {
    const isMajor = rotationDeg % 90 === 0;
    const tickWidth = isMajor ? width * 3 : width;
    const tickHeight = isMajor ? height * 1.6 : height;
    const tickColor = isMajor ? '#6c5ce7' : color;
    const adjustedX = isMajor ? x - (tickWidth - width) / 2 : x;

    return (
      <Rect
        x={adjustedX}
        y={y}
        width={tickWidth}
        height={tickHeight}
        fill={tickColor}
        rx={rounding}
        ry={rounding}
        transform={`rotate(${rotationDeg} ${rotateX} ${rotateY})`}
      />
    );
  }
);

interface ICustomBackgroundViewProps {
  color?: string;
  size?: number;
  style?: AnimatedStyle<ViewStyle>;
}

const CustomBackgroundView = React.memo(
  ({ size = 0, style }: ICustomBackgroundViewProps) => (
    <Animated.View
      style={[
        styles.background,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
    >
      <Svg width={size} height={size}>
        <Circle cx={size / 2} cy={size / 2} r={size / 2} fill="#f0e6ff" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2.6}
          fill="#e6d5ff"
          strokeWidth={1}
          stroke="#d4bfff"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={size / 4}
          fill="#dcc8ff"
          strokeWidth={1}
          stroke="#c9a8ff"
        />
      </Svg>
    </Animated.View>
  )
);

export const CustomComponentsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Custom Components</Text>
      <Text style={styles.description}>
        Replace sub-components via render injection — custom diamond marker,
        major ticks, and patterned background
      </Text>
      <View style={styles.timerContainer}>
        <RotaryTimer
          size={300}
          ringWidth={16}
          ringActiveColor="#6c5ce7"
          ringInactiveColor="#ddd"
          ticksCount={60}
          tickHeight={10}
          tickWidth={2}
          tickColor="#b0a0d0"
          tickRounding={1}
          tickSpaceFromRing={6}
          markerColor="#d4bfff"
          markerSize={20}
          backgroundColor="#f0e6ff"
          backgroundSize={250}
          TickItemViewComponent={CustomTickItemView}
          BackgroundViewComponent={CustomBackgroundView}
          labelTextStyle={styles.label}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a2e',
    textAlign: 'center',
  },
  description: {
    fontSize: 13,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 18,
    paddingHorizontal: 30,
  },
  timerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 24,
    fontWeight: '600',
    color: '#6c5ce7',
  },
});
