import React from 'react';
import RotaryTimerProvider from './context/RotaryTimerProvider';
import RotaryTimer from './components/timer/RotaryTimer';
import { renderLabel as renderLabelDefault } from './helper';
import {
  DEFAULT_INITIAL_ROTATION,
  DEFAULT_IS_EDITABLE,
  DEFAULT_RING_WIDTH,
  DEFAULT_TICKS_COUNT,
  DEFAULT_TIMER_SIZE,
} from './constants/defaults';
import type { IRotaryTimerProps } from './types';
import useRotationSharedValue from './hooks/useRotationSharedValue';

const RotaryTimerWrapper = ({
  size = DEFAULT_TIMER_SIZE,
  ringWidth = DEFAULT_RING_WIDTH,
  ticksCount = DEFAULT_TICKS_COUNT,
  initialRotation = DEFAULT_INITIAL_ROTATION,
  isEditable = DEFAULT_IS_EDITABLE,
  rotationSharedValue: externalRotationSharedValue,
  onChange,
  onFeedback,
  feedbackTicksCount = ticksCount,
  snapTicksCount = ticksCount,
  renderLabel = renderLabelDefault,
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
}: IRotaryTimerProps) => {
  const rotationSharedValue = useRotationSharedValue(
    externalRotationSharedValue,
    initialRotation
  );

  return (
    <RotaryTimerProvider
      size={size}
      ringWidth={ringWidth}
      isEditable={isEditable}
      ticksCount={ticksCount}
      feedbackTicksCount={feedbackTicksCount}
      snapTicksCount={snapTicksCount}
      rotationSharedValue={rotationSharedValue}
      onChange={onChange}
      onFeedback={onFeedback}
      renderLabel={renderLabel}
    >
      <RotaryTimer
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
    </RotaryTimerProvider>
  );
};

export default React.memo(RotaryTimerWrapper);
