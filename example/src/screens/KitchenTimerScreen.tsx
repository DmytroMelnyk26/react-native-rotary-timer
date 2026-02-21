import { useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RotaryTimer, {
  convertRadiansToMilliseconds,
  convertMillisecondsToTime,
} from 'react-native-rotary-timer';
import * as Haptics from 'expo-haptics';

const renderLabel = (rad: number): string => {
  const ms = convertRadiansToMilliseconds(rad);
  const { totalHours, minutes } = convertMillisecondsToTime(ms);
  if (totalHours) {
    return `${totalHours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

export const KitchenTimerScreen = () => {
  const onFeedback = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kitchen Timer</Text>
      <Text style={styles.description}>
        Custom MM:SS label, 12 ticks, snapping every minute, multi-turn (2
        rotations = 120 min)
      </Text>
      <View style={styles.timerContainer}>
        <RotaryTimer
          size={280}
          ringWidth={22}
          ringActiveColor="#ff9800"
          ringInactiveColor="#ffe0b2"
          minRotation={0}
          maxRotation={4 * Math.PI}
          ticksCount={12}
          tickHeight={14}
          tickWidth={3}
          tickColor="#5d4037"
          tickRounding={2}
          tickSpaceFromRing={10}
          snapTicksCount={60}
          feedbackTicksCount={60}
          onFeedback={onFeedback}
          markerColor="#e65100"
          markerSize={24}
          renderLabel={renderLabel}
          hintColor="#ff9800"
          hintSize={180}
          backgroundColor="#fff3e0"
          backgroundSize={230}
          labelTextStyle={styles.label}
        />
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
  label: {
    fontSize: 32,
    fontWeight: '700',
    color: '#5d4037',
  },
});
