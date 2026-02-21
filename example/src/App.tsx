import React, { useCallback, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HomeScreen, type IExample } from './screens/HomeScreen';
import { DefaultTimerScreen } from './screens/DefaultTimerScreen';
import { DarkThemeScreen } from './screens/DarkThemeScreen';
import { PomodoroScreen } from './screens/PomodoroScreen';
import { KitchenTimerScreen } from './screens/KitchenTimerScreen';
import { CustomComponentsScreen } from './screens/CustomComponentsScreen';
import { RefApiScreen } from './screens/RefApiScreen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const EXAMPLES: IExample[] = [
  {
    key: 'default',
    title: '⏱️  Default Timer',
    description: 'Zero configuration — works out of the box with all defaults',
  },
  {
    key: 'dark',
    title: '🌙  Dark Theme',
    description:
      'Full visual customization — ring, ticks, marker, background, label styling',
  },
  {
    key: 'pomodoro',
    title: '🍅  Pomodoro Timer',
    description:
      'Countdown with useCountdown hook, haptic feedback, and ref control',
  },
  {
    key: 'kitchen',
    title: '🍳  Kitchen Timer',
    description:
      'Custom MM:SS label, snapping, haptics, and multi-turn rotation (120 min)',
  },
  {
    key: 'custom',
    title: '🧩  Custom Components',
    description:
      'Render injection — diamond marker, major ticks, patterned background',
  },
  {
    key: 'ref',
    title: '🎮  Ref API & Shared Value',
    description:
      'Programmatic control: increase, reduce, set, reset, isEditable toggle',
  },
];

const SCREENS: Record<string, React.ComponentType> = {
  default: DefaultTimerScreen,
  dark: DarkThemeScreen,
  pomodoro: PomodoroScreen,
  kitchen: KitchenTimerScreen,
  custom: CustomComponentsScreen,
  ref: RefApiScreen,
};

export default function App() {
  const [activeScreen, setActiveScreen] = useState<string | null>(null);

  const handleSelect = useCallback((key: string) => {
    setActiveScreen(key);
  }, []);

  const handleBack = useCallback(() => {
    setActiveScreen(null);
  }, []);

  const ScreenComponent = activeScreen ? SCREENS[activeScreen] : null;

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <SafeAreaView style={styles.root}>
          {ScreenComponent ? (
            <>
              <TouchableOpacity
                style={styles.backButton}
                onPress={handleBack}
                activeOpacity={0.7}
              >
                <Text style={styles.backText}>← Examples</Text>
              </TouchableOpacity>
              <ScreenComponent />
            </>
          ) : (
            <HomeScreen examples={EXAMPLES} onSelect={handleSelect} />
          )}
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 56,
    left: 16,
    zIndex: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a2e',
  },
});
