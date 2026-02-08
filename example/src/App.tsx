import { View, StyleSheet } from 'react-native';
import RotaryTimer from 'react-native-rotary-timer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';

import { useCallback } from 'react';
import { useSharedValue } from 'react-native-reanimated';

// const renderLabel = (rad: number) => {
//   return rad.toFixed(2);
// };

export default function App() {
  const rotationSharedValue = useSharedValue(0);
  const onChange = useCallback((rad: number) => {
    console.log('onChange', rad);
  }, []);

  const onFeedback = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const onTouchTimerStart = () => {
    console.log('onTouchTimerStart');
  };

  const onTouchTimerEnd = () => {
    console.log('onTouchTimerEnd');
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <RotaryTimer
          size={200}
          rotationSharedValue={rotationSharedValue}
          ringWidth={20}
          // maxRotation={Math.PI}
          // minRotation={0}
          // ticksCount={20}
          // snapTicksCount={60}
          // initialRotation={Math.PI}
          labelHideWhenZero={false}
          ticksCount={24}
          tickWidth={1}
          tickRounding={1}
          tickSpaceFromRing={10}
          minRotation={0}
          onChange={onChange}
          onFeedback={onFeedback}
          onTouchTimerStart={onTouchTimerStart}
          onTouchTimerEnd={onTouchTimerEnd}
          hintHideWhenNotZero={false}
          hintEnabledRotation={false}
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
