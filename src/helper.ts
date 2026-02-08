import { TWO_PI } from './constants/math';
import { DEFAULT_MINUTES_PER_CIRCLE } from './constants/defaults';

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

export function convertMs(ms: number): {
  days: number;
  hours: number;
  totalHours: number;
  minutes: number;
  totalMinutes: number;
  seconds: number;
  totalSeconds: number;
  millis: number;
} {
  'worklet';
  const totalSeconds = Math.floor(ms / 1000);
  const millis = Math.floor(ms % 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;

  return {
    days,
    hours,
    totalHours,
    minutes,
    totalMinutes,
    seconds,
    totalSeconds,
    millis,
  };
}

export function radToMs(
  rad: number,
  minutesPerCircle = DEFAULT_MINUTES_PER_CIRCLE
): number {
  'worklet';
  const ms = Math.max(
    0,
    Math.round((rad / TWO_PI) * minutesPerCircle * 60 * 1000)
  );

  return ms;
}

export function msToRad(
  ms: number,
  minutesPerCircle = DEFAULT_MINUTES_PER_CIRCLE
) {
  'worklet';
  return (ms / (minutesPerCircle * 60 * 1000)) * TWO_PI;
}

export function renderLabel(rad: number): string {
  'worklet';
  if (!Number.isFinite(rad)) {
    return '00:00:00';
  }

  const value = Math.abs(rad);
  const isNegative = rad < 0;

  const ms = radToMs(value);
  const { totalHours, minutes, seconds } = convertMs(ms);

  const pad2 = (n: number) => String(n).padStart(2, '0');

  return `${isNegative ? '-' : ''}${pad2(totalHours)}:${pad2(minutes)}:${pad2(
    seconds
  )}`;
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
