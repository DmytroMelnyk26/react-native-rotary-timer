import { View, StyleSheet, Text } from 'react-native';
import RotaryTimer from 'react-native-rotary-timer';

export const DarkThemeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dark Theme</Text>
      <Text style={styles.description}>
        Full visual customization — colors, ticks, marker, background, label
      </Text>
      <View style={styles.timerContainer}>
        <RotaryTimer
          size={300}
          ringWidth={14}
          ringActiveColor="#00e5ff"
          ringInactiveColor="#2a2a3e"
          ticksCount={60}
          tickHeight={12}
          tickWidth={2}
          tickColor="#3a3a52"
          tickRounding={1}
          tickSpaceFromRing={8}
          markerColor="#00e5ff"
          markerSize={18}
          hintColor="#4a4a6a"
          hintSize={240}
          backgroundColor="#1a1a2e"
          backgroundSize={260}
          labelHideWhenZero={false}
          labelTextStyle={styles.label}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#e0e0e0',
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
  label: {
    color: '#00e5ff',
    fontSize: 28,
    fontWeight: '300',
  },
});
