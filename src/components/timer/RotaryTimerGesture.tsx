import React from 'react';
import RotaryTimerView from './RotaryTimerView';
import { GestureDetector } from 'react-native-gesture-handler';
import useGesture from './useGesture';
import type { IRotaryTimerComponents, IRotaryTimerRef } from '../../types';
import useFeedback from './useFeedback';
import useControl from '../../hooks/useControl';

const RotaryTimerGesture = ({
  ref,
  BackgroundComponent,
  BackgroundViewComponent,
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
}: Partial<IRotaryTimerComponents> & { ref?: React.Ref<IRotaryTimerRef> }) => {
  const gesture = useGesture();

  useControl(ref);

  useFeedback();
  return (
    <GestureDetector gesture={gesture}>
      <RotaryTimerView
        BackgroundComponent={BackgroundComponent}
        BackgroundViewComponent={BackgroundViewComponent}
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

export default React.memo(RotaryTimerGesture);
