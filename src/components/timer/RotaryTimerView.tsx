import React from 'react';
import Svg from 'react-native-svg';
import useRotaryTimer from '../../hooks/useRotaryTimer';
import { StyleSheet, View } from 'react-native';
import type { IRotaryTimerComponents } from '../../types';
import Ring from '../ring/Ring';
import Ticks from '../tick/Ticks';
import Marker from '../marker/Marker';
import Label from '../label/Label';
import Hint from '../hint/Hint';

const RotaryTimerView = ({
  RingComponent = Ring,
  RingViewComponent,
  TicksComponent = Ticks,
  TickItemComponent,
  TickItemViewComponent,
  MarkerComponent = Marker,
  MarkerViewComponent,
  LabelComponent = Label,
  LabelViewComponent,
  HintComponent = Hint,
  HintViewComponent,
}: Partial<IRotaryTimerComponents>) => {
  const { size } = useRotaryTimer();

  return (
    <View
      style={[{ width: size, height: size }, styles.container]}
      collapsable={false}
    >
      <Svg width={size} height={size}>
        <RingComponent ViewComponent={RingViewComponent} />
        <TicksComponent
          TickItemComponent={TickItemComponent}
          TickItemViewComponent={TickItemViewComponent}
        />
        <MarkerComponent ViewComponent={MarkerViewComponent} />
      </Svg>
      <HintComponent ViewComponent={HintViewComponent} />
      <LabelComponent ViewComponent={LabelViewComponent} />
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
