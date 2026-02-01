import React from 'react';
import RotaryTimerProvider from './context/RotaryTimerProvider';
import RotaryTimer from './components/RotaryTimer';
import { renderLabel as renderLabelDefault } from './helper';
import {
  DEFAULT_RING_WIDTH,
  DEFAULT_TICKS_COUNT,
  DEFAULT_TIMER_SIZE,
} from './constants/defaults';
import { Ring } from './components/Ring';
import Ticks from './components/Ticks';
import Marker from './components/Marker';
import Label from './components/Label';
import EmptyState from './components/EmptyState';
import type { IRotaryTimerProps } from './types';

const RotaryTimerWrapper = ({
  size = DEFAULT_TIMER_SIZE,
  ringWidth = DEFAULT_RING_WIDTH,
  ticksCount = DEFAULT_TICKS_COUNT,
  rotationSharedValue,
  onChange,
  onFeedback,
  feedbackTicksCount = ticksCount,
  renderLabel = renderLabelDefault,
  RingComponent = Ring,
  TicksComponent = Ticks,
  MarkerComponent = Marker,
  LabelComponent = Label,
  EmptyStateComponent = EmptyState,
}: IRotaryTimerProps) => {
  return (
    <RotaryTimerProvider
      size={size}
      ringWidth={ringWidth}
      ticksCount={ticksCount}
      feedbackTicksCount={feedbackTicksCount}
      rotationSharedValue={rotationSharedValue}
      onChange={onChange}
      onFeedback={onFeedback}
      renderLabel={renderLabel}
    >
      <RotaryTimer
        RingComponent={RingComponent}
        TicksComponent={TicksComponent}
        MarkerComponent={MarkerComponent}
        LabelComponent={LabelComponent}
        EmptyStateComponent={EmptyStateComponent}
      />
    </RotaryTimerProvider>
  );
};

export default React.memo(RotaryTimerWrapper);
