import { useMemo } from 'react';
import { getStepAngle } from '../helpers';

export const useStepAngle = (angle?: number, step?: number) => {
  return useMemo(() => getStepAngle(angle, step), [angle, step]);
};
