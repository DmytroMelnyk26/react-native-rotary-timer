import { useCallback, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import RotaryTimer, {
  convertMillisecondsToRadians,
  convertMillisecondsToTime,
  convertRadiansToMilliseconds,
  type IRotaryTimerRef,
  useCountdown,
} from 'react-native-rotary-timer';
import Animated, {
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';

const FIVE_MIN_RAD = convertMillisecondsToRadians(5 * 60 * 1000);
const THIRTY_MIN_RAD = convertMillisecondsToRadians(30 * 60 * 1000);

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const RefApiScreen = () => {
  const timerRef = useRef<IRotaryTimerRef>(null);
  const [isEditable, setIsEditable] = useState(true);
  const [isCountdown, setIsCountdown] = useState(false);
  const [timeDisplay, setTimeDisplay] = useState('0m 0s');
  const [radDisplay, setRadDisplay] = useState('0.000 rad');
  const rotationSharedValue = useSharedValue(0);

  const handleChange = useCallback((rad: number) => {
    const ms = convertRadiansToMilliseconds(rad);
    const { minutes, seconds } = convertMillisecondsToTime(ms);
    setTimeDisplay(`${minutes}m ${seconds}s`);
    setRadDisplay(`${rad.toFixed(3)} rad`);
  }, []);

  const handleIncrease = useCallback(() => {
    timerRef.current?.increaseRotation(FIVE_MIN_RAD);
  }, []);

  const handleReduce = useCallback(() => {
    timerRef.current?.reduceRotation(FIVE_MIN_RAD);
  }, []);

  const handleSet = useCallback(() => {
    timerRef.current?.setRotation(THIRTY_MIN_RAD);
  }, []);

  const handleReset = useCallback(() => {
    timerRef.current?.reset();
  }, []);

  const animatedProps = useAnimatedProps(() => {
    const milliseconds = convertRadiansToMilliseconds(
      rotationSharedValue.value || 0
    );
    const { totalHours, minutes } = convertMillisecondsToTime(milliseconds);
    const text = `${totalHours}h ${minutes}m`;
    return {
      text: text,
      defaultValue: text,
    };
  });

  const interval = useCallback(() => {
    const oneSecRad = convertMillisecondsToRadians(1000);
    return setInterval(() => {
      timerRef.current?.reduceRotation(oneSecRad);
    }, 1000);
  }, []);

  const { onTouchEnd, onTouchStart } = useCountdown(interval, isCountdown);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ref API & Shared Value</Text>
      <Text style={styles.description}>
        Programmatic control via ref methods + external rotationSharedValue sync
      </Text>
      <View style={styles.timerContainer}>
        <RotaryTimer
          ref={timerRef}
          size={260}
          ringWidth={18}
          ringActiveColor="#2ecc71"
          ringInactiveColor="#e0f5e9"
          isEditable={isEditable}
          rotationSharedValue={rotationSharedValue}
          onChange={handleChange}
          minRotation={0}
          ticksCount={60}
          tickWidth={1}
          tickHeight={10}
          tickRounding={1}
          tickSpaceFromRing={8}
          markerColor="#27ae60"
          hintColor="#2ecc71"
          hintSize={180}
          backgroundColor="#e8f8f0"
          backgroundSize={220}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        />
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Shared Value</Text>
          <Text style={styles.infoValue}>{radDisplay}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Time</Text>
          <Text style={styles.infoValue}>{timeDisplay}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Sync Time</Text>
          <AnimatedTextInput
            animatedProps={animatedProps}
            style={[styles.infoValue, styles.inputInfoValue]}
            editable={false}
            multiline={false}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>

      <View style={styles.controls}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleIncrease}>
            <Text style={styles.buttonText}>+5 min</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleReduce}>
            <Text style={styles.buttonText}>−5 min</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleSet}>
            <Text style={styles.buttonText}>Set 30 min</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.toggleButton]}
            onPress={() => setIsEditable(!isEditable)}
          >
            <Text style={styles.buttonText}>
              Gestures: {isEditable ? 'ON' : 'OFF'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.toggleButton]}
            onPress={() => setIsCountdown(!isCountdown)}
          >
            <Text style={styles.buttonText}>
              Countdown: {isCountdown ? 'ON' : 'OFF'}
            </Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 16,
    lineHeight: 18,
    paddingHorizontal: 30,
  },
  timerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 11,
    color: '#6c757d',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#27ae60',
    marginTop: 2,
  },
  inputInfoValue: {
    minWidth: 80,
    textAlign: 'center',
  },
  controls: {
    paddingHorizontal: 30,
    paddingBottom: 50,
    gap: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#2ecc71',
    alignItems: 'center',
  },
  toggleButton: {
    borderColor: '#6c757d',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a2e',
  },
});
