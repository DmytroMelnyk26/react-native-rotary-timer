import { View, StyleSheet } from 'react-native';
import RotaryTimer, {
  useCountdown,
  msToRad,
  type IRotaryTimerRef,
} from 'react-native-rotary-timer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';

import { useCallback, useRef } from 'react';

// const renderLabel = (rad: number) => {
//   return rad.toFixed(2);
// };

export default function App() {
  const onChange = useCallback((rad: number) => {
    console.log('onChange', rad);
  }, []);

  const onFeedback = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const timerRef = useRef<IRotaryTimerRef>(null);

  const interval = useCallback(() => {
    const rad = msToRad(1000);
    return setInterval(() => {
      timerRef.current?.reduceRotation?.(rad);
    }, 1000);
  }, []);

  const { onTouchEnd, onTouchStart } = useCountdown(interval);

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <RotaryTimer
          size={300}
          hintSize={200}
          ref={timerRef}
          // rotationSharedValue={rotationSharedValue}
          ringWidth={20}
          // maxRotation={Math.PI}
          minRotation={0}
          // ticksCount={20}
          // snapTicksCount={60}
          // initialRotation={Math.PI}
          labelHideWhenZero={false}
          // ticksCount={24}
          tickWidth={1}
          tickRounding={1}
          tickSpaceFromRing={10}
          // minRotation={0}
          onChange={onChange}
          onFeedback={onFeedback}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          // markerColor={'blue'}
          // markerSize={5}
          // feedbackTicksCount={4}
          // feedbackAngle={Math.PI / 2}
          // feedbackOffsetAngle={Math.PI / 4}
          // LabelComponent={LabelWorklet}
          // isEditable={false}
          // ticksCount={30}
          // renderLabel={renderLabel}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
