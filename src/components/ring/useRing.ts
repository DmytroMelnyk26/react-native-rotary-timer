import { useMemo } from 'react';
import {
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import { useRotaryTimerCore, useRotaryTimerAppearance } from '../../hooks';
import { normalizeAngle0To2Pi } from '../../helpers';
import { DEFAULT_RING_ACTIVE_COLOR, TWO_PI } from '../../constants';
import type { IGradientColors } from '../../types';

const averageColor = (c1: string, c2: string): string => {
  return interpolateColor(0.5, [0, 1], [c1, c2]) as string;
};

export const normalizeColors = (color?: IGradientColors): string[] => {
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

export const useRing = () => {
  const { size, ringWidth, rotationSharedValue } = useRotaryTimerCore();
  const { ringActiveColor } = useRotaryTimerAppearance();

  const cx = size / 2;
  const cy = size / 2;
  const radius = Math.max((size - ringWidth) / 2, 0);

  const animatedRotationSharedValue = useDerivedValue(() => {
    return withSpring(rotationSharedValue.value);
  });

  const colors = useMemo(
    () => normalizeColors(ringActiveColor),
    [ringActiveColor]
  );

  const effectiveDashSV = useDerivedValue(() => {
    const circumference = TWO_PI * radius;
    const absRotations = Math.abs(animatedRotationSharedValue.value);
    const fullRotations = Math.floor(absRotations / TWO_PI);
    const remainder = normalizeAngle0To2Pi(absRotations);
    const remainderLength = remainder * radius;
    const dashLength = fullRotations * TWO_PI * radius + remainderLength;
    return Math.min(dashLength, circumference);
  });

  const animatedProps = useAnimatedProps(() => {
    const circumference = TWO_PI * radius;
    return {
      strokeDasharray: `${circumference} ${circumference}`,
      strokeDashoffset: 2 * circumference - effectiveDashSV.value,
    };
  });

  const animatedTipProps = useAnimatedProps(() => {
    const theta = effectiveDashSV.value / radius;
    const colorProgress = (theta / TWO_PI) * (colors.length - 1);
    const idx = Math.min(Math.floor(colorProgress), colors.length - 2);
    const t = colorProgress - idx;
    const c1 = colors[Math.max(idx, 0)]!;
    const c2 = colors[Math.min(idx + 1, colors.length - 1)]!;
    return {
      cx: cx + radius * Math.sin(theta),
      cy: cy - radius * Math.cos(theta),
      fill: interpolateColor(t, [0, 1], [c1, c2]) as string,
      opacity: effectiveDashSV.value > 0 ? 1 : 0,
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    const isNegative = animatedRotationSharedValue.value < 0;
    const absRotation = Math.abs(animatedRotationSharedValue.value);
    const excessRadians = Math.max(0, absRotation - TWO_PI);
    const rotateDeg = (excessRadians * 180) / Math.PI;

    return {
      transform: [
        { scaleX: isNegative ? -1 : 1 },
        { rotate: `${rotateDeg}deg` },
      ],
    };
  });

  return {
    animatedStyle,
    animatedProps,
    animatedTipProps,
    colors,
  };
};
