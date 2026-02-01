import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import useRotaryTimer from './useRotaryTimer';
import { useMemo } from 'react';
import { scheduleOnRN } from 'react-native-worklets';
import {
  angleFromPointTopZero,
  normalizeAngle0To2Pi,
  normalizeDeltaAngle,
} from '../helper';

const useGesture = () => {
  const { center, rotationSharedValue, onChange } = useRotaryTimer();

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

            const targetRotation = Math.max(
              0,
              (currentRotationSharedValue.value || 0) + deltaAngle
            );

            currentRotationSharedValue.value = targetRotation;
            rotationSharedValue.value = withSpring(targetRotation, {
              duration: 100,
            });
          }

          previousAngleSharedValue.value = currentAngle;
        })
        .onEnd(() => {
          if (onChange) {
            scheduleOnRN(onChange, rotationSharedValue.value);
          }
        }),
    [
      center,
      previousAngleSharedValue,
      currentRotationSharedValue,
      rotationSharedValue,
      onChange,
    ]
  );

  const tapGesture = useMemo(
    () =>
      Gesture.Tap().onEnd((e) => {
        const x = e.x - center;
        const y = e.y - center;

        const angle = angleFromPointTopZero(x, y);
        const currentRotation = rotationSharedValue.value;

        const normalizedCurrent = normalizeAngle0To2Pi(currentRotation);
        const diff = normalizeDeltaAngle(angle - normalizedCurrent);

        const targetRotation = Math.max(0, currentRotation + diff);

        rotationSharedValue.value = withSpring(targetRotation, {
          duration: 500,
        });

        if (onChange) {
          scheduleOnRN(onChange, targetRotation);
        }
      }),
    [center, rotationSharedValue, onChange]
  );

  const gesture = useMemo(
    () => Gesture.Simultaneous(panGesture, tapGesture),
    [panGesture, tapGesture]
  );

  return gesture;
};

export default useGesture;
