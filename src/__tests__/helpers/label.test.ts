import { TWO_PI } from '../../constants';
import { renderLabel } from '../../helpers/label';

const FULL_CIRCLE = TWO_PI;
const HALF_CIRCLE = Math.PI;

describe('renderLabel', () => {
  it('returns 00:00:00 for Infinity', () => {
    expect(renderLabel(Infinity)).toBe('00:00:00');
  });

  it('returns 00:00:00 for -Infinity', () => {
    expect(renderLabel(-Infinity)).toBe('00:00:00');
  });

  it('returns 00:00:00 for NaN', () => {
    expect(renderLabel(NaN)).toBe('00:00:00');
  });

  it('returns 00:00:00 for 0 rad', () => {
    expect(renderLabel(0)).toBe('00:00:00');
  });

  it('returns 01:00:00 for one full circle (default 60 min/circle)', () => {
    expect(renderLabel(FULL_CIRCLE)).toBe('01:00:00');
  });

  it('returns 00:30:00 for half circle', () => {
    expect(renderLabel(HALF_CIRCLE)).toBe('00:30:00');
  });

  it('returns 02:00:00 for two full circles', () => {
    expect(renderLabel(2 * FULL_CIRCLE)).toBe('02:00:00');
  });

  it('returns 00:01:00 for 1 min', () => {
    const oneMinute = FULL_CIRCLE / 60;
    expect(renderLabel(oneMinute)).toBe('00:01:00');
  });

  it('returns 00:00:01 for 1 sec', () => {
    const oneSecond = FULL_CIRCLE / 3600;
    expect(renderLabel(oneSecond)).toBe('00:00:01');
  });

  it('returns negative label for negative radians', () => {
    expect(renderLabel(-HALF_CIRCLE)).toBe('-00:30:00');
  });

  it('respects custom minutesPerCircle', () => {
    expect(renderLabel(FULL_CIRCLE, 120)).toBe('02:00:00');
  });

  it('shows totalHours beyond 24 without wrapping', () => {
    expect(renderLabel(25 * FULL_CIRCLE)).toBe('25:00:00');
  });
});
