import { TWO_PI, DEFAULT_MINUTES_PER_CIRCLE } from '../constants';

export function convertMillisecondsToTime(value: number): {
  days: number;
  hours: number;
  totalHours: number;
  minutes: number;
  totalMinutes: number;
  seconds: number;
  totalSeconds: number;
  milliseconds: number;
  isNegative: boolean;
} {
  'worklet';
  const isNegative = value < 0;
  const ms = Math.abs(value);
  const milliseconds = Math.floor(ms % 1000);
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);

  return {
    days,
    hours,
    totalHours,
    minutes,
    totalMinutes,
    seconds,
    totalSeconds,
    milliseconds,
    isNegative,
  };
}

export function convertRadiansToMilliseconds(
  rad: number,
  minutesPerCircle = DEFAULT_MINUTES_PER_CIRCLE
): number {
  'worklet';
  return Math.round((rad / TWO_PI) * minutesPerCircle * 60 * 1000);
}

export function convertMillisecondsToRadians(
  ms: number,
  minutesPerCircle = DEFAULT_MINUTES_PER_CIRCLE
) {
  'worklet';
  return (ms / (minutesPerCircle * 60 * 1000)) * TWO_PI;
}
