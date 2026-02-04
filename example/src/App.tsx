import { View, StyleSheet } from 'react-native';
import RotaryTimer from 'react-native-rotary-timer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';

import { useCallback } from 'react';
import { useSharedValue } from 'react-native-reanimated';

// const renderLabel = (rad: number) => {
//   // 'worklet';
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

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <RotaryTimer
          size={300}
          rotationSharedValue={rotationSharedValue}
          // ringWidth={10}
          initialRotation={Math.PI}
          onChange={onChange}
          onFeedback={onFeedback}
          snapTicksCount={6}
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
