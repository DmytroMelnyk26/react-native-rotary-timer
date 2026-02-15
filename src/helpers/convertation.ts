import { TWO_PI, DEFAULT_MINUTES_PER_CIRCLE } from '../constants';

export function convertMillisecondsToTime(ms: number): {
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

export function convertRadiansToMilliseconds(
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

export function convertMillisecondsToRadians(
  ms: number,
  minutesPerCircle = DEFAULT_MINUTES_PER_CIRCLE
) {
  'worklet';
  return (ms / (minutesPerCircle * 60 * 1000)) * TWO_PI;
}
