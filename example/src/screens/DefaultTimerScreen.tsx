import { View, StyleSheet, Text } from 'react-native';
import RotaryTimer from 'react-native-rotary-timer';

export const DefaultTimerScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Default Timer</Text>
      <Text style={styles.description}>
        Zero configuration — just drop in and go.{'\n'}All default props are
        used.
      </Text>
      <View style={styles.timerContainer}>
        <RotaryTimer />
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
  },
  timerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
