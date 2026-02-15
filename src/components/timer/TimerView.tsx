import React from 'react';
import { useRotaryTimer } from '../../hooks';
import { StyleSheet, View } from 'react-native';
import type { IRotaryTimerComponents } from '../../types';
import { Ring } from '../ring';
import { Ticks } from '../tick';
import { Marker } from '../marker';
import { Label } from '../label';
import { Hint } from '../hint';
import { Background } from '../background';

export const TimerView = React.memo(
  ({
    BackgroundComponent = Background,
    BackgroundViewComponent,
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
        <BackgroundComponent ViewComponent={BackgroundViewComponent} />
        <RingComponent ViewComponent={RingViewComponent} />
        <TicksComponent
          TickItemComponent={TickItemComponent}
          TickItemViewComponent={TickItemViewComponent}
        />
        <MarkerComponent ViewComponent={MarkerViewComponent} />
        <HintComponent ViewComponent={HintViewComponent} />
        <LabelComponent ViewComponent={LabelViewComponent} />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
