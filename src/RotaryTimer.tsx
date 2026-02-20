import React from 'react';
import { RotaryTimerProvider } from './context';
import { Timer } from './components';
import { renderLabel as renderLabelDefault } from './helpers';
import {
  DEFAULT_HINT_COLOR,
  DEFAULT_HINT_ENABLED_ROTATION,
  DEFAULT_HINT_HIDE_WHEN_NOT_ZERO,
  DEFAULT_HINT_SIZE,
  DEFAULT_INITIAL_ROTATION,
  DEFAULT_IS_EDITABLE,
  DEFAULT_LABEL_HIDE_WHEN_ZERO,
  DEFAULT_RING_ACTIVE_COLOR,
  DEFAULT_RING_INACTIVE_COLOR,
  DEFAULT_RING_WIDTH,
  DEFAULT_TICK_COLOR,
  DEFAULT_TICK_HEIGHT,
  DEFAULT_TICK_WIDTH,
  DEFAULT_TICKS_COUNT,
  DEFAULT_TIMER_SIZE,
} from './constants';
import type { IRotaryTimerProps } from './types';
import { useRotationSharedValue, useStableCallback } from './hooks';

export const RotaryTimer = React.memo(
  ({
    ref,
    size = DEFAULT_TIMER_SIZE,

    ringWidth = DEFAULT_RING_WIDTH,
    ringActiveColor = DEFAULT_RING_ACTIVE_COLOR,
    ringInactiveColor = DEFAULT_RING_INACTIVE_COLOR,

    initialRotation = DEFAULT_INITIAL_ROTATION,
    maxRotation,
    minRotation,

    isEditable = DEFAULT_IS_EDITABLE,
    rotationSharedValue: externalRotationSharedValue,
    onChange,
    onTouchStart,
    onTouchEnd,

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
    labelHideWhenZero = DEFAULT_LABEL_HIDE_WHEN_ZERO,
    renderLabel = renderLabelDefault,

    hintSize = DEFAULT_HINT_SIZE,
    hintColor = DEFAULT_HINT_COLOR,
    hintHideWhenNotZero = DEFAULT_HINT_HIDE_WHEN_NOT_ZERO,
    hintEnabledRotation = DEFAULT_HINT_ENABLED_ROTATION,

    backgroundSize = size,
    backgroundColor,
    backgroundStyle,

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
  }: IRotaryTimerProps) => {
    const rotationSharedValue = useRotationSharedValue(
      externalRotationSharedValue,
      initialRotation
    );

    const onChangeStable = useStableCallback(onChange);
    const onFeedbackStable = useStableCallback(onFeedback);

    const onTouchStartStable = useStableCallback(onTouchStart);
    const onTouchEndStable = useStableCallback(onTouchEnd);

    return (
      <RotaryTimerProvider
        size={size}
        ringWidth={ringWidth}
        ringActiveColor={ringActiveColor}
        ringInactiveColor={ringInactiveColor}
        initialRotation={initialRotation}
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
        backgroundSize={backgroundSize}
        backgroundColor={backgroundColor}
        backgroundStyle={backgroundStyle}
        onChange={onChangeStable}
        onTouchStart={onTouchStartStable}
        onTouchEnd={onTouchEndStable}
      >
        <Timer
          ref={ref}
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
      </RotaryTimerProvider>
    );
  }
);
