import { Gesture } from 'react-native-gesture-handler';
import {
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import useRotaryTimer from '../../hooks/useRotaryTimer';
import { useMemo } from 'react';
import { scheduleOnRN } from 'react-native-worklets';
import {
  angleFromPointTopZero,
  normalizeAngle0To2Pi,
  normalizeDeltaAngle,
} from '../../helper';
import useStepAngle from '../../hooks/useStepAngle';

const snapToStep = (value: number, step: number, offset: number = 0) => {
  'worklet';
  if (!step) {
    return value;
  }
  return Math.round((value - offset) / step) * step + offset;
};

const maxMinValue = (
  value: number,
  max: number | undefined = Number.POSITIVE_INFINITY,
  min: number | undefined = Number.NEGATIVE_INFINITY
) => {
  'worklet';
  return Math.max(Math.min(value, max), min);
};

const useGesture = () => {
  const {
    center,
    maxRotation,
    minRotation,
    rotationSharedValue,
    isEditable,
    snapTicksCount,
    snapAngle,
    snapOffsetAngle,
    onChange,
    onTouchTimerStart,
    onTouchTimerEnd,
  } = useRotaryTimer();

  const stepSnapping = useStepAngle(snapAngle, snapTicksCount);

  const previousAngleSharedValue = useSharedValue<number | null>(null);
  const currentRotationSharedValue = useSharedValue<number | null>(null);
  const initialRotationSharedValue = useSharedValue<number>(0);

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .onStart(() => {
          if (onTouchTimerStart) {
            scheduleOnRN(onTouchTimerStart, rotationSharedValue.value);
          }

          previousAngleSharedValue.value = null;
          currentRotationSharedValue.value = rotationSharedValue.value;
          initialRotationSharedValue.value = rotationSharedValue.value;
        })
        .onChange((e) => {
          const x = e.x - center;
          const y = e.y - center;

          const currentAngle = angleFromPointTopZero(x, y);

          if (previousAngleSharedValue.value !== null) {
            const deltaAngle = normalizeDeltaAngle(
              currentAngle - previousAngleSharedValue.value
            );

            const limitedRotation = maxMinValue(
              (currentRotationSharedValue.value || 0) + deltaAngle,
              maxRotation,
              minRotation
            );

            currentRotationSharedValue.value = limitedRotation;
            rotationSharedValue.value = withSpring(limitedRotation, {
              duration: 100,
            });
          }

          previousAngleSharedValue.value = currentAngle;
        })
        .onEnd(() => {
          const snapRotation = snapToStep(
            rotationSharedValue.value,
            stepSnapping,
            snapOffsetAngle
          );

          const limitedRotation = maxMinValue(
            snapRotation,
            maxRotation,
            minRotation
          );

          rotationSharedValue.value = withTiming(limitedRotation, {
            duration: 100,
          });

          if (onTouchTimerEnd) {
            scheduleOnRN(onTouchTimerEnd, limitedRotation);
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
      center,
      previousAngleSharedValue,
      currentRotationSharedValue,
      initialRotationSharedValue,
      rotationSharedValue,
      maxRotation,
      minRotation,
      isEditable,
      stepSnapping,
      snapOffsetAngle,
      onChange,
      onTouchTimerStart,
      onTouchTimerEnd,
    ]
  );

  const tapGesture = useMemo(
    () =>
      Gesture.Tap()
        .onStart(() => {
          if (onTouchTimerStart) {
            scheduleOnRN(onTouchTimerStart, rotationSharedValue.value);
          }
        })
        .onEnd((e) => {
          const x = e.x - center;
          const y = e.y - center;

          const angle = angleFromPointTopZero(x, y);
          const currentRotation = rotationSharedValue.value;

          const normalizedCurrent = normalizeAngle0To2Pi(currentRotation);
          const diff = normalizeDeltaAngle(angle - normalizedCurrent);

          const targetRotation = snapToStep(
            currentRotation + diff,
            stepSnapping,
            snapOffsetAngle
          );

          const limitedRotation = maxMinValue(
            targetRotation,
            maxRotation,
            minRotation
          );

          rotationSharedValue.value = withTiming(limitedRotation, {
            duration: 500,
          });

          if (onTouchTimerEnd) {
            scheduleOnRN(onTouchTimerEnd, limitedRotation);
          }
          if (onChange && limitedRotation !== currentRotation) {
            scheduleOnRN(onChange, limitedRotation);
          }
        })
        .enabled(!!isEditable),
    [
      center,
      rotationSharedValue,
      maxRotation,
      minRotation,
      isEditable,
      stepSnapping,
      snapOffsetAngle,
      onChange,
      onTouchTimerEnd,
      onTouchTimerStart,
    ]
  );

  const gesture = useMemo(
    () => Gesture.Simultaneous(panGesture, tapGesture),
    [panGesture, tapGesture]
  );

  return gesture;
};

export default useGesture;
