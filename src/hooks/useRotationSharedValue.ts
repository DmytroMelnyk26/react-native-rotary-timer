import { useSharedValue } from 'react-native-reanimated';
import { useEffect } from 'react';
import type { IRotaryTimerProps } from '../types';
import { DEFAULT_INITIAL_ROTATION } from '../constants';

export const useRotationSharedValue = (
  externalRotationSharedValue: IRotaryTimerProps['rotationSharedValue'],
  initialRotation: IRotaryTimerProps['initialRotation'] = DEFAULT_INITIAL_ROTATION
) => {
  const internalRotationSharedValue = useSharedValue(initialRotation);

  const rotationSharedValue =
    externalRotationSharedValue ?? internalRotationSharedValue;

  useEffect(() => {
    if (externalRotationSharedValue) {
      externalRotationSharedValue.value = initialRotation;
    }
  }, [externalRotationSharedValue, initialRotation]);

  return rotationSharedValue;
};
