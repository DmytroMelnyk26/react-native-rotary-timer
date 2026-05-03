import React, { useId, useMemo } from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  type AnimatedProps,
  type AnimatedStyle,
} from 'react-native-reanimated';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Stop,
} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export interface IRingViewProps {
  animatedProps: AnimatedProps<typeof AnimatedCircle>;
  animatedStyle: AnimatedStyle<ViewStyle>;
  animatedTipProps: AnimatedProps<typeof AnimatedCircle>;
  size: number;
  width: number;
  colors: string[];
  inactiveColor?: string;
}

export interface IArcSegment {
  d: string;
  startColor: string;
  endColor: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const ARC_OVERLAP = 0.01;

//reference https://github.com/wcandillon/can-it-be-done-in-react-native/blob/master/the-10-min/src/AngularGradient/AngularGradient.tsx
export const generateArcs = (
  cx: number,
  cy: number,
  r: number,
  colors: string[]
): IArcSegment[] => {
  const segments = Math.max(colors.length - 1, 1);
  const step = (2 * Math.PI) / segments;
  const xPos = (a: number) => cx + r * Math.sin(a);
  const yPos = (a: number) => cy - r * Math.cos(a);

  const arcs: IArcSegment[] = [];
  for (let i = 0; i < segments; i++) {
    const a = i * step - ARC_OVERLAP;
    const aEnd = (i + 1) * step;
    const arcSpan = aEnd - a;
    const largeArc = arcSpan > Math.PI ? 1 : 0;

    arcs.push({
      d: `M ${xPos(a)} ${yPos(a)} A ${r} ${r} 0 ${largeArc} 1 ${xPos(
        aEnd
      )} ${yPos(aEnd)}`,
      startColor: colors[i]!,
      endColor: colors[i + 1] ?? colors[i]!,
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
    animatedTipProps,
    size,
    width,
    colors,
    inactiveColor,
  }: IRingViewProps) => {
    const id = useId();

    const cx = size / 2;
    const cy = size / 2;
    const radius = Math.max((size - width) / 2, 0);

    const arcs = useMemo(
      () => generateArcs(cx, cy, radius, colors),
      [cx, cy, radius, colors]
    );

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

        {/* Inactive background ring */}
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke={inactiveColor}
          strokeWidth={width}
          fill="none"
        />

        {/* Active angular gradient arcs */}
        {arcs.map((arc, key) => (
          <Path
            key={`${id}-arc-${key}`}
            d={arc.d}
            fill="none"
            stroke={`url(#${id}-grad-${key})`}
            strokeWidth={width}
          />
        ))}

        {/* Inactive mask circle covering unfilled portion */}
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

        {/* Start cap dot at 12 o'clock */}
        <Circle cx={cx} cy={cy - radius} r={width / 2} fill={colors[0]} />

        {/* Tip cap dot at animated progress position */}
        <AnimatedCircle r={width / 2} animatedProps={animatedTipProps} />
      </AnimatedSvg>
    );
  }
);
