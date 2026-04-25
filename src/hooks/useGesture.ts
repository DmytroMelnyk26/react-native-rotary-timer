import { useMemo } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { scheduleOnRN } from 'react-native-worklets';
import { useSharedValue } from 'react-native-reanimated';
import { useRotaryTimer, useStepAngle } from './index';
import {
  angleFromPointTopZero,
  maxMinValue,
  normalizeAngle0To2Pi,
  normalizeDeltaAngle,
  snapToStep,
} from '../helpers';

export const useGesture = () => {
  const {
    size,
    maxRotation,
    minRotation,
    rotationSharedValue,
    isEditable,
    snapTicksCount,
    snapAngle,
    snapOffsetAngle,
    onChange,
    onTouchStart,
    onTouchEnd,
  } = useRotaryTimer();

  const stepSnapping = useStepAngle(snapAngle, snapTicksCount);

  const previousAngleSharedValue = useSharedValue<number | null>(null);
  const initialRotationSharedValue = useSharedValue<number>(0);

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .onStart(() => {
          if (onTouchStart) {
            scheduleOnRN(onTouchStart, rotationSharedValue.value);
          }

          previousAngleSharedValue.value = null;
          initialRotationSharedValue.value = rotationSharedValue.value;
        })
        .onChange((e) => {
          const x = e.x - size / 2;
          const y = e.y - size / 2;

          const currentAngle = angleFromPointTopZero(x, y);

          if (previousAngleSharedValue.value !== null) {
            const deltaAngle = normalizeDeltaAngle(
              currentAngle - previousAngleSharedValue.value
            );

            const limitedRotation = maxMinValue(
              (rotationSharedValue.value || 0) + deltaAngle,
              maxRotation,
              minRotation
            );

            rotationSharedValue.value = limitedRotation;
          }

          previousAngleSharedValue.value = currentAngle;
        })
        .onEnd(() => {
          const snapRotation = snapToStep(
            rotationSharedValue.value,
            stepSnapping,
            snapOffsetAngle,
            maxRotation,
            minRotation
          );

          const limitedRotation = maxMinValue(
            snapRotation,
            maxRotation,
            minRotation
          );

          rotationSharedValue.value = limitedRotation;

          if (onTouchEnd) {
            scheduleOnRN(onTouchEnd, limitedRotation);
          }
          if (
            onChange &&
            limitedRotation !== initialRotationSharedValue.value
          ) {
            scheduleOnRN(onChange, limitedRotation);
          }
        })
        .enabled(!!isEditable),
    [
      size,
      previousAngleSharedValue,
      initialRotationSharedValue,
      rotationSharedValue,
      maxRotation,
      minRotation,
      isEditable,
      stepSnapping,
      snapOffsetAngle,
      onChange,
      onTouchStart,
      onTouchEnd,
    ]
  );

  const tapGesture = useMemo(
    () =>
      Gesture.Tap()
        .onStart(() => {
          if (onTouchStart) {
            scheduleOnRN(onTouchStart, rotationSharedValue.value);
          }
        })
        .onEnd((e) => {
          const x = e.x - size / 2;
          const y = e.y - size / 2;

          const angle = angleFromPointTopZero(x, y);
          const currentRotation = rotationSharedValue.value;

          const normalizedCurrent = normalizeAngle0To2Pi(currentRotation);
          const diff = normalizeDeltaAngle(angle - normalizedCurrent);

          const snapRotation = snapToStep(
            currentRotation + diff,
            stepSnapping,
            snapOffsetAngle,
            maxRotation,
            minRotation
          );

          const limitedRotation = maxMinValue(
            snapRotation,
            maxRotation,
            minRotation
          );

          rotationSharedValue.value = limitedRotation;

          if (onTouchEnd) {
            scheduleOnRN(onTouchEnd, limitedRotation);
          }
          if (onChange && limitedRotation !== currentRotation) {
            scheduleOnRN(onChange, limitedRotation);
          }
        })
        .maxDistance(10)
        .enabled(!!isEditable),
    [
      size,
      rotationSharedValue,
      maxRotation,
      minRotation,
      isEditable,
      stepSnapping,
      snapOffsetAngle,
      onChange,
      onTouchEnd,
      onTouchStart,
    ]
  );

  const gesture = useMemo(
    () => Gesture.Simultaneous(panGesture, tapGesture),
    [panGesture, tapGesture]
  );

  return gesture;
};
