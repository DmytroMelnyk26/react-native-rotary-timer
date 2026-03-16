import React, { type ComponentProps, useId, useMemo } from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  type AnimatedProps,
  type AnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Stop,
} from 'react-native-svg';
import { DEFAULT_RING_ACTIVE_COLOR } from '../../constants';
import type { IGradientColors } from '../../types';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const ARC_OVERLAP = 0.01;

export interface IRingViewProps {
  animatedProps: AnimatedProps<ComponentProps<typeof Circle>>;
  animatedStyle: AnimatedStyle<ViewStyle>;
  size: number;
  width: number;
  activeColor?: IGradientColors;
  inactiveColor?: string;
}

const averageColor = (c1: string, c2: string) => {
  return interpolateColor(0.5, [0, 1], [c1, c2]);
};
const normalizeColors = (color?: string | string[]): string[] => {
  if (!color) {
    return Array(3).fill(DEFAULT_RING_ACTIVE_COLOR);
  }

  const colors = Array.isArray(color) ? color : [color];

  if (colors.length === 1) {
    return Array(3).fill(colors[0]);
  }

  if (colors.length === 2) {
    const avg = averageColor(colors[0]!, colors[1]!);
    return [colors[0]!, avg, colors[1]!];
  }

  return colors;
};

//reference https://github.com/wcandillon/can-it-be-done-in-react-native/blob/master/the-10-min/src/AngularGradient/AngularGradient.tsx

const generateArcs = (cx: number, cy: number, r: number, colors: string[]) => {
  const segments = Array.isArray(colors) ? Math.max(colors.length - 1, 1) : 1;
  const step = (2 * Math.PI) / segments;
  const xPos = (α: number) => cx + r * Math.sin(α);
  const yPos = (α: number) => cy - r * Math.cos(α);

  const arcs = [];
  for (let i = 0; i < segments; i++) {
    const a = i * step - ARC_OVERLAP;
    const aEnd = (i + 1) * step;
    const arcSpan = aEnd - a;
    const largeArc = arcSpan > Math.PI ? 1 : 0;

    arcs.push({
      d: `M ${xPos(a)} ${yPos(a)} A ${r} ${r} 0 ${largeArc} 1 ${xPos(
        aEnd
      )} ${yPos(aEnd)}`,
      startColor: colors[i],
      endColor: colors[i + 1] || colors[i],
      x1: xPos(a),
      y1: yPos(a),
      x2: xPos(aEnd),
      y2: yPos(aEnd),
    });
  }
  return arcs;
};

export const RingView = React.memo(
  ({
    animatedProps,
    animatedStyle,
    size,
    width,
    activeColor,
    inactiveColor,
  }: IRingViewProps) => {
    const cx = size / 2;
    const cy = size / 2;
    const radius = Math.max((size - width) / 2, 0);

    const colors = useMemo(() => normalizeColors(activeColor), [activeColor]);

    const arcs = useMemo(
      () => generateArcs(cx, cy, radius, colors),
      [cx, cy, radius, colors]
    );

    const id = useId();

    return (
      <AnimatedSvg
        width={size}
        height={size}
        style={[StyleSheet.absoluteFill, animatedStyle]}
      >
        <Defs>
          {arcs.map((arc, key) => (
            <LinearGradient
              key={`${id}-grad-${key}`}
              id={`${id}-grad-${key}`}
              gradientUnits="userSpaceOnUse"
              x1={arc.x1}
              y1={arc.y1}
              x2={arc.x2}
              y2={arc.y2}
            >
              <Stop offset="0" stopColor={arc.startColor} />
              <Stop offset="1" stopColor={arc.endColor} />
            </LinearGradient>
          ))}
        </Defs>

        {/* Gradient arc segments (always fully drawn) */}
        {arcs.map((arc, key) => (
          <Path
            key={`${id}-arc-${key}`}
            d={arc.d}
            fill="none"
            stroke={`url(#${id}-grad-${key})`}
            strokeWidth={width}
          />
        ))}

        {/* Mask circle: covers unfilled portion with inactiveColor */}
        <AnimatedCircle
          cx={cx}
          cy={cy}
          r={radius}
          stroke={inactiveColor}
          strokeWidth={width + 1}
          animatedProps={animatedProps}
          fill="none"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      </AnimatedSvg>
    );
  }
);
