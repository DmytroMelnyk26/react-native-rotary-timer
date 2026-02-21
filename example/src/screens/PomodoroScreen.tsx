import { useCallback, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import RotaryTimer, {
  useCountdown,
  convertMillisecondsToRadians,
  type IRotaryTimerRef,
  convertMillisecondsToTime,
  convertRadiansToMilliseconds,
} from 'react-native-rotary-timer';
import * as Haptics from 'expo-haptics';

const MINUTES_PER_CIRCLE = 25;

const MAX_VALUE = convertMillisecondsToRadians(
  25 * 60 * 1000,
  MINUTES_PER_CIRCLE
);

const DEFAULT_VALUE = convertMillisecondsToRadians(
  20 * 60 * 1000,
  MINUTES_PER_CIRCLE
);

export const PomodoroScreen = () => {
  const timerRef = useRef<IRotaryTimerRef>(null);
  const [isActive, setIsActive] = useState(false);

  const onFeedback = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const interval = useCallback(() => {
    const oneSecRad = convertMillisecondsToRadians(1000, MINUTES_PER_CIRCLE);
    return setInterval(() => {
      timerRef.current?.reduceRotation(oneSecRad);
    }, 1000);
  }, []);

  const { onTouchEnd, onTouchStart } = useCountdown(interval, isActive);

  const handleReset = useCallback(() => {
    setIsActive(false);
    timerRef.current?.setRotation(DEFAULT_VALUE);
  }, []);

  const renderLabel = useCallback((rad: number) => {
    const ms = convertRadiansToMilliseconds(rad, MINUTES_PER_CIRCLE);
    const { minutes, seconds } = convertMillisecondsToTime(ms);
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');
    return `${mm}:${ss}`;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pomodoro Timer</Text>
      <Text style={styles.description}>
        25-min countdown with haptic feedback, useCountdown hook, and ref
        control
      </Text>
      <View style={styles.timerContainer}>
        <RotaryTimer
          ref={timerRef}
          size={280}
          ringWidth={18}
          ringActiveColor="#ff6b6b"
          ringInactiveColor="#ffe0e0"
          minRotation={0}
          maxRotation={MAX_VALUE}
          initialRotation={DEFAULT_VALUE}
          ticksCount={MINUTES_PER_CIRCLE}
          tickWidth={1}
          tickHeight={10}
          tickRounding={1}
          tickSpaceFromRing={8}
          onFeedback={onFeedback}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          renderLabel={renderLabel}
          hintSize={180}
          hintColor="#ff6b6b"
          backgroundColor="#fff5f5"
          backgroundSize={240}
        />
      </View>
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, isActive && styles.buttonActive]}
          onPress={() => setIsActive(!isActive)}
        >
          <Text
            style={[styles.buttonText, isActive && styles.buttonTextActive]}
          >
            {isActive ? 'Pause' : 'Start'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={handleReset}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a2e',
    textAlign: 'center',
  },
  description: {
    fontSize: 13,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 18,
    paddingHorizontal: 30,
  },
  timerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingBottom: 60,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#ff6b6b',
  },
  buttonActive: {
    backgroundColor: '#ff6b6b',
  },
  buttonOutline: {
    borderColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff6b6b',
  },
  buttonTextActive: {
    color: '#fff',
  },
});
