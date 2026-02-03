import React from 'react';
import RotaryTimerView from './RotaryTimerView';
import { GestureDetector } from 'react-native-gesture-handler';
import useGesture from './useGesture';
import type { IRotaryTimerComponents } from '../../types';
import useFeedback from './useFeedback';

const RotaryTimer = ({
  RingComponent,
  RingViewComponent,
  TicksComponent,
  TickItemComponent,
  TickItemViewComponent,
  MarkerComponent,
  MarkerViewComponent,
  LabelComponent,
  LabelViewComponent,
  HintComponent,
  HintViewComponent,
}: Partial<IRotaryTimerComponents>) => {
  const gesture = useGesture();

  useFeedback();
  return (
    <GestureDetector gesture={gesture}>
      <RotaryTimerView
        RingComponent={RingComponent}
        RingViewComponent={RingViewComponent}
        TicksComponent={TicksComponent}
        TickItemComponent={TickItemComponent}
        TickItemViewComponent={TickItemViewComponent}
        MarkerComponent={MarkerComponent}
        MarkerViewComponent={MarkerViewComponent}
        LabelComponent={LabelComponent}
        LabelViewComponent={LabelViewComponent}
        HintComponent={HintComponent}
        HintViewComponent={HintViewComponent}
      />
    </GestureDetector>
  );
};

export default React.memo(RotaryTimer);
