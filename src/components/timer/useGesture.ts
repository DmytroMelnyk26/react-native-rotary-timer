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

const snapToStep = (value: number, step: number) => {
  'worklet';
  return Math.round(value / step) * step;
};

const useGesture = () => {
  const { center, rotationSharedValue, isEditable, snapTicksCount, onChange } =
    useRotaryTimer();

  const stepSnapping = useMemo(
    () => (Math.PI * 2) / snapTicksCount,
    [snapTicksCount]
  );

  const previousAngleSharedValue = useSharedValue<number | null>(null);
  const currentRotationSharedValue = useSharedValue<number | null>(null);

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .onStart(() => {
          previousAngleSharedValue.value = null;
          currentRotationSharedValue.value = rotationSharedValue.value;
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
            stepSnapping
          );
          rotationSharedValue.value = withTiming(targetRotation, {
            duration: 100,
          });

          if (onChange) {
            scheduleOnRN(onChange, targetRotation);
          }
        })
        .enabled(!!isEditable),
    [
      center,
      previousAngleSharedValue,
      currentRotationSharedValue,
      rotationSharedValue,
      isEditable,
      stepSnapping,
      onChange,
    ]
  );

  const tapGesture = useMemo(
    () =>
      Gesture.Tap()
        .onEnd((e) => {
          const x = e.x - center;
          const y = e.y - center;

          const angle = angleFromPointTopZero(x, y);
          const currentRotation = rotationSharedValue.value;

          const normalizedCurrent = normalizeAngle0To2Pi(currentRotation);
          const diff = normalizeDeltaAngle(angle - normalizedCurrent);

          const rawRotation = Math.max(0, currentRotation + diff);
          const targetRotation = snapToStep(rawRotation, stepSnapping);

          rotationSharedValue.value = withTiming(targetRotation, {
            duration: 500,
          });

          if (onChange) {
            scheduleOnRN(onChange, targetRotation);
          }
        })
        .enabled(!!isEditable),
    [center, rotationSharedValue, isEditable, stepSnapping, onChange]
  );

  const gesture = useMemo(
    () => Gesture.Simultaneous(panGesture, tapGesture),
    [panGesture, tapGesture]
  );

  return gesture;
};

export default useGesture;
