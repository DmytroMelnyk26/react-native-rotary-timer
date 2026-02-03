import React from 'react';
import RotaryTimerView from './RotaryTimerView';
import { GestureDetector } from 'react-native-gesture-handler';
import useGesture from '../hooks/useGesture';
import type { IRotaryTimerComponents } from '../types';
import useFeedback from '../hooks/useFeedback';

const RotaryTimer = ({
  RingComponent,
  TicksComponent,
  MarkerComponent,
  LabelComponent,
  HintComponent,
}: IRotaryTimerComponents) => {
  const gesture = useGesture();

  useFeedback();
  return (
    <GestureDetector gesture={gesture}>
      <RotaryTimerView
        RingComponent={RingComponent}
        TicksComponent={TicksComponent}
        MarkerComponent={MarkerComponent}
        LabelComponent={LabelComponent}
        HintComponent={HintComponent}
      />
    </GestureDetector>
  );
};

export default React.memo(RotaryTimer);
