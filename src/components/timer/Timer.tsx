import React from 'react';
import { GestureDetector } from 'react-native-gesture-handler';
import { TimerView } from './TimerView';
import { useGesture } from './useGesture';
import type { IRotaryTimerComponents, IRotaryTimerRef } from '../../types';
import { useFeedback } from './useFeedback';
import { useControl } from '../../hooks';

export type ITimerProps = Partial<IRotaryTimerComponents> & {
  ref?: React.Ref<IRotaryTimerRef>;
};

export const Timer = React.memo(
  ({
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
  }: ITimerProps) => {
    const gesture = useGesture();

    useControl(ref);

    useFeedback();
    return (
      <GestureDetector gesture={gesture}>
        <TimerView
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
  }
);
