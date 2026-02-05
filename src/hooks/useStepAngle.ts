import { useMemo } from 'react';
import { getStepAngle } from '../helper';

const useStepAngle = (angle?: number, step?: number) => {
  return useMemo(() => getStepAngle(angle, step), [angle, step]);
};

export default useStepAngle;
