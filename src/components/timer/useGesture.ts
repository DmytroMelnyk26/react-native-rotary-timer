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
import { TWO_PI } from '../../constants/math';

const snapToStep = (value: number, step: number, offset: number = 0) => {
  'worklet';
  if (!step) {
    return value;
  }
  return Math.round((value - offset) / step) * step + offset;
};

const useGesture = () => {
  const {
    center,
    rotationSharedValue,
    isEditable,
    snapTicksCount,
    snapAngle,
    snapOffsetAngle,
    onChange,
    onTouchTimerStart,
    onTouchTimerEnd,
  } = useRotaryTimer();

  const stepSnapping = useMemo(() => {
    if (snapAngle) {
      return snapAngle;
    } else if (snapTicksCount) {
      return TWO_PI / snapTicksCount;
    }
    return 0;
  }, [snapAngle, snapTicksCount]);

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

            const rawRotation = Math.max(
              0,
              (currentRotationSharedValue.value || 0) + deltaAngle
            );

            currentRotationSharedValue.value = rawRotation;
            rotationSharedValue.value = withSpring(rawRotation, {
              duration: 100,
            });
          }

          previousAngleSharedValue.value = currentAngle;
        })
        .onEnd(() => {
          const targetRotation = snapToStep(
            rotationSharedValue.value,
            stepSnapping,
            snapOffsetAngle
          );
          rotationSharedValue.value = withTiming(targetRotation, {
            duration: 100,
          });

          if (onTouchTimerEnd) {
            scheduleOnRN(onTouchTimerEnd, targetRotation);
          }
          if (onChange && targetRotation !== initialRotationSharedValue.value) {
            scheduleOnRN(onChange, targetRotation);
          }
        })
        .enabled(!!isEditable),
    [
      center,
      previousAngleSharedValue,
      currentRotationSharedValue,
      initialRotationSharedValue,
      rotationSharedValue,
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

          const rawRotation = Math.max(0, currentRotation + diff);
          const targetRotation = snapToStep(
            rawRotation,
            stepSnapping,
            snapOffsetAngle
          );

          rotationSharedValue.value = withTiming(targetRotation, {
            duration: 500,
          });

          if (onTouchTimerEnd) {
            scheduleOnRN(onTouchTimerEnd, targetRotation);
          }
          if (onChange && targetRotation !== currentRotation) {
            scheduleOnRN(onChange, targetRotation);
          }
        })
        .enabled(!!isEditable),
    [
      center,
      rotationSharedValue,
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
