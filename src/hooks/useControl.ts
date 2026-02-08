import React, { useCallback, useImperativeHandle } from 'react';
import useRotaryTimer from './useRotaryTimer';
import { withSpring } from 'react-native-reanimated';
import { maxMinValue } from '../helper';
import { DEFAULT_INITIAL_ROTATION } from '../constants/defaults';
import type { IRotaryTimerRef } from '../types';

const useControl = (ref?: React.Ref<IRotaryTimerRef>) => {
  const { rotationSharedValue, maxRotation, minRotation, initialRotation } =
    useRotaryTimer();

  const setRotation = useCallback(
    (rotation: number) => {
      const newValue = maxMinValue(rotation, maxRotation, minRotation);
      rotationSharedValue.value = withSpring(newValue);
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

export default useControl;
