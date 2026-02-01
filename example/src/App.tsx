import { View, StyleSheet } from 'react-native';
import RotaryTimer from 'react-native-rotary-timer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useCallback } from 'react';

function renderLabel(rad: number) {
  'worklet';
  return rad.toFixed(2);
}

export default function App() {
  const onChange = useCallback((rad: number) => {
    console.log('onChange', rad);
  }, []);

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <RotaryTimer
          size={300}
          ringWidth={10}
          onChange={onChange}
          ticksCount={30}
          renderLabel={renderLabel}
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
