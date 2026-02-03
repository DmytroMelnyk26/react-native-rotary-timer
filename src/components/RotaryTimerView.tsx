import React from 'react';
import Svg from 'react-native-svg';
import useRotaryTimer from '../hooks/useRotaryTimer';
import { StyleSheet, View } from 'react-native';
import type { IRotaryTimerComponents } from '../types';

const RotaryTimerView = ({
  RingComponent,
  TicksComponent,
  MarkerComponent,
  LabelComponent,
  HintComponent,
}: IRotaryTimerComponents) => {
  const { size } = useRotaryTimer();

  return (
    <View
      style={[{ width: size, height: size }, styles.container]}
      collapsable={false}
    >
      <Svg width={size} height={size}>
        <RingComponent />
        <TicksComponent />
        <MarkerComponent />
      </Svg>
      <HintComponent />
      <LabelComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(RotaryTimerView);
