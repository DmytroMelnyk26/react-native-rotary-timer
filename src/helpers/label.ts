import {
  convertMillisecondsToTime,
  convertRadiansToMilliseconds,
} from './convertation';

export function renderLabel(rad: number, minutesPerCircle?: number): string {
  'worklet';
  if (!Number.isFinite(rad)) {
    return '00:00:00';
  }

  const value = Math.abs(rad);
  const isNegative = rad < 0;

  const ms = convertRadiansToMilliseconds(value, minutesPerCircle);
  const { totalHours, minutes, seconds } = convertMillisecondsToTime(ms);

  const pad2 = (n: number) => String(n).padStart(2, '0');

  return `${isNegative ? '-' : ''}${pad2(totalHours)}:${pad2(minutes)}:${pad2(
    seconds
  )}`;
}
