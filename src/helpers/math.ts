import { TWO_PI } from '../constants';

export function normalizeAngle0To2Pi(angle: number): number {
  'worklet';
  return ((angle % TWO_PI) + TWO_PI) % TWO_PI;
}

export function normalizeDeltaAngle(delta: number): number {
  'worklet';
  if (delta > Math.PI) return delta - TWO_PI;
  if (delta < -Math.PI) return delta + TWO_PI;
  return delta;
}

export function angleFromPointTopZero(x: number, y: number): number {
  'worklet';
  return normalizeAngle0To2Pi(Math.atan2(y, x) + Math.PI / 2);
}

export function getStepAngle(angle?: number, stepCount?: number): number {
  if (angle) {
    return angle;
  } else if (stepCount) {
    return TWO_PI / stepCount;
  }
  return 0;
}

export const snapToStep = (value: number, step: number, offset: number = 0) => {
  'worklet';
  if (!step) {
    return value;
  }
  return Math.round((value - offset) / step) * step + offset;
};

export const maxMinValue = (
  value: number,
  max: number | undefined = Number.POSITIVE_INFINITY,
  min: number | undefined = Number.NEGATIVE_INFINITY
) => {
  'worklet';
  return Math.max(Math.min(value, max), min);
};
