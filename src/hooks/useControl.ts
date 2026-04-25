import React, { useCallback, useImperativeHandle } from 'react';
import { useRotaryTimerCore } from './useRotaryTimerContexts';
import { maxMinValue } from '../helpers';
import { DEFAULT_INITIAL_ROTATION } from '../constants';
import type { IRotaryTimerRef } from '../types';

export const useControl = (ref?: React.Ref<IRotaryTimerRef>) => {
  const { rotationSharedValue, maxRotation, minRotation, initialRotation } =
    useRotaryTimerCore();

  const setRotation = useCallback(
    (rotation: number) => {
      rotationSharedValue.value = maxMinValue(
        rotation,
        maxRotation,
        minRotation
      );
    },
    [rotationSharedValue, maxRotation, minRotation]
  );

  const increaseRotation = useCallback(
    (rotation: number) => {
      setRotation(rotationSharedValue.value + rotation);
    },
    [rotationSharedValue, setRotation]
  );

  const reduceRotation = useCallback(
    (rotation: number) => {
      setRotation(rotationSharedValue.value - rotation);
    },
    [rotationSharedValue, setRotation]
  );

  const reset = useCallback(() => {
    setRotation(initialRotation || DEFAULT_INITIAL_ROTATION);
  }, [initialRotation, setRotation]);

  useImperativeHandle(
    ref,
    () => ({
      increaseRotation,
      reduceRotation,
      setRotation,
      reset,
    }),
    [increaseRotation, reduceRotation, setRotation, reset]
  );
};
