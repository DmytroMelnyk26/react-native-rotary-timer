import {
  convertMillisecondsToTime,
  convertRadiansToMilliseconds,
  convertMillisecondsToRadians,
} from '../../helpers/convertation';

const createTimeObject = ({
  days = 0,
  hours = 0,
  totalHours = 0,
  minutes = 0,
  totalMinutes = 0,
  seconds = 0,
  totalSeconds = 0,
  milliseconds = 0,
  isNegative = false,
} = {}) => ({
  days,
  hours,
  totalHours,
  minutes,
  totalMinutes,
  seconds,
  totalSeconds,
  milliseconds,
  isNegative,
});

describe('convertMillisecondsToTime', () => {
  it('0ms is 0s', () => {
    expect(convertMillisecondsToTime(0)).toEqual(createTimeObject());
  });

  it('1000ms is 1s', () => {
    expect(convertMillisecondsToTime(1000)).toEqual(
      createTimeObject({ seconds: 1, totalSeconds: 1 })
    );
  });

  it('61000ms is 1m and 1s', () => {
    expect(convertMillisecondsToTime(61000)).toEqual(
      createTimeObject({
        minutes: 1,
        seconds: 1,
        totalMinutes: 1,
        totalSeconds: 61,
      })
    );
  });

  it('3600000ms is 1h', () => {
    expect(convertMillisecondsToTime(3600000)).toEqual(
      createTimeObject({
        hours: 1,
        totalHours: 1,
        totalMinutes: 60,
        totalSeconds: 3600,
      })
    );
  });

  it('90061000ms is 1d, 1h, 1m and 1s', () => {
    expect(convertMillisecondsToTime(90061000)).toEqual(
      createTimeObject({
        days: 1,
        hours: 1,
        minutes: 1,
        seconds: 1,
        totalHours: 25,
        totalMinutes: 1501,
        totalSeconds: 90061,
      })
    );
  });

  it('1500ms is 1s and 500ms', () => {
    expect(convertMillisecondsToTime(1500)).toEqual(
      createTimeObject({
        seconds: 1,
        totalSeconds: 1,
        milliseconds: 500,
      })
    );
  });

  it('negative 90061000ms is 1d, 1h, 1m and 1s', () => {
    expect(convertMillisecondsToTime(-90061000)).toEqual(
      createTimeObject({
        days: 1,
        hours: 1,
        minutes: 1,
        seconds: 1,
        totalHours: 25,
        totalMinutes: 1501,
        totalSeconds: 90061,
        isNegative: true,
      })
    );
  });
});

describe('convertRadiansToMilliseconds', () => {
  it('0rad is 0ms', () => {
    expect(convertRadiansToMilliseconds(0)).toBe(0);
  });

  it('2PI rad is 3600000ms', () => {
    expect(convertRadiansToMilliseconds(2 * Math.PI)).toBe(3600000);
  });

  it('-2PI rad is -3600000ms', () => {
    expect(convertRadiansToMilliseconds(-2 * Math.PI)).toBe(-3600000);
  });

  it('2PI rad is 1800000ms with custom minutesPerCircle', () => {
    expect(convertRadiansToMilliseconds(2 * Math.PI, 30)).toBe(1800000);
  });
});

describe('convertMillisecondsToRadians', () => {
  it('0ms is 0rad', () => {
    expect(convertMillisecondsToRadians(0)).toBe(0);
  });

  it('3600000ms is 2PI', () => {
    expect(convertMillisecondsToRadians(3600000)).toBeCloseTo(2 * Math.PI, 5);
  });

  it('-3600000ms is -2PI rad', () => {
    expect(convertMillisecondsToRadians(-3600000)).toBeCloseTo(-2 * Math.PI, 5);
  });

  it('1800000ms is 2PI rad with custom minutesPerCircle', () => {
    expect(convertMillisecondsToRadians(1800000, 30)).toBeCloseTo(
      2 * Math.PI,
      5
    );
  });
});
