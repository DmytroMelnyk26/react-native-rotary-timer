import React from 'react';
import RotaryTimerProvider from './context/RotaryTimerProvider';
import RotaryTimer from './components/timer/RotaryTimer';
import { renderLabel as renderLabelDefault } from './helper';
import {
  DEFAULT_HINT_COLOR,
  DEFAULT_HINT_ENABLED_ROTATION,
  DEFAULT_HINT_SIZE,
  DEFAULT_INITIAL_ROTATION,
  DEFAULT_IS_EDITABLE,
  DEFAULT_RING_WIDTH,
  DEFAULT_TICK_COLOR,
  DEFAULT_TICK_HEIGHT,
  DEFAULT_TICK_WIDTH,
  DEFAULT_TICKS_COUNT,
  DEFAULT_TIMER_SIZE,
} from './constants/defaults';
import type { IRotaryTimerProps } from './types';
import useRotationSharedValue from './hooks/useRotationSharedValue';
import useStableCallback from './hooks/useStableCallback';

const RotaryTimerWrapper = ({
  size = DEFAULT_TIMER_SIZE,
  ringWidth = DEFAULT_RING_WIDTH,

  initialRotation = DEFAULT_INITIAL_ROTATION,
  maxRotation,
  minRotation,

  isEditable = DEFAULT_IS_EDITABLE,
  rotationSharedValue: externalRotationSharedValue,
  onChange,
  onTouchTimerStart,
  onTouchTimerEnd,

  ticksCount = DEFAULT_TICKS_COUNT,
  tickAngle,
  tickOffsetAngle,
  tickHeight = DEFAULT_TICK_HEIGHT,
  tickWidth = DEFAULT_TICK_WIDTH,
  tickColor = DEFAULT_TICK_COLOR,
  tickSpaceFromRing,
  tickRounding,

  snapTicksCount = ticksCount,
  snapAngle,
  snapOffsetAngle,

  feedbackTicksCount = ticksCount,
  feedbackAngle,
  feedbackOffsetAngle,
  onFeedback,

  markerColor,
  markerSize = ringWidth,

  labelTextStyle,
  labelHideWhenZero,
  renderLabel = renderLabelDefault,

  hintSize = DEFAULT_HINT_SIZE,
  hintColor = DEFAULT_HINT_COLOR,
  hintHideWhenNotZero,
  hintEnabledRotation = DEFAULT_HINT_ENABLED_ROTATION,

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

  const onChangeStable = useStableCallback(onChange);
  const onFeedbackStable = useStableCallback(onFeedback);

  const onTouchTimerStartStable = useStableCallback(onTouchTimerStart);
  const onTouchTimerEndStable = useStableCallback(onTouchTimerEnd);

  return (
    <RotaryTimerProvider
      size={size}
      ringWidth={ringWidth}
      rotationSharedValue={rotationSharedValue}
      maxRotation={maxRotation}
      minRotation={minRotation}
      isEditable={isEditable}
      ticksCount={ticksCount}
      tickAngle={tickAngle}
      tickOffsetAngle={tickOffsetAngle}
      tickHeight={tickHeight}
      tickWidth={tickWidth}
      tickColor={tickColor}
      tickSpaceFromRing={tickSpaceFromRing}
      tickRounding={tickRounding}
      snapTicksCount={snapTicksCount}
      snapAngle={snapAngle}
      snapOffsetAngle={snapOffsetAngle}
      onFeedback={onFeedbackStable}
      feedbackTicksCount={feedbackTicksCount}
      feedbackAngle={feedbackAngle}
      feedbackOffsetAngle={feedbackOffsetAngle}
      markerColor={markerColor}
      markerSize={markerSize}
      labelTextStyle={labelTextStyle}
      labelHideWhenZero={labelHideWhenZero}
      renderLabel={renderLabel}
      hintColor={hintColor}
      hintSize={hintSize}
      hintHideWhenNotZero={hintHideWhenNotZero}
      hintEnabledRotation={hintEnabledRotation}
      onChange={onChangeStable}
      onTouchTimerStart={onTouchTimerStartStable}
      onTouchTimerEnd={onTouchTimerEndStable}
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
