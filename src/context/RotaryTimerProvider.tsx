import React, { type PropsWithChildren, useMemo } from 'react';
import RotaryTimerContext from './RotaryTimerContext';
import type { IRotaryTimerContext } from './types';

interface RotaryTimerProviderProps
  extends PropsWithChildren,
    IRotaryTimerContext {}

const RotaryTimerProvider = ({
  children,
  size,
  ringWidth,
  isEditable,

  rotationSharedValue,
  maxRotation,
  minRotation,

  ticksCount,
  tickAngle,
  tickOffsetAngle,
  tickHeight,
  tickWidth,
  tickColor,
  tickSpaceFromRing,
  tickRounding,

  feedbackAngle,
  feedbackTicksCount,
  feedbackOffsetAngle,
  onFeedback,

  snapAngle,
  snapTicksCount,
  snapOffsetAngle,

  markerColor,
  markerSize,

  labelTextStyle,
  labelHideWhenZero,
  renderLabel,

  hintSize,
  hintColor,
  hintHideWhenNotZero,
  hintEnabledRotation,

  onChange,
  onTouchTimerStart,
  onTouchTimerEnd,
}: RotaryTimerProviderProps) => {
  const value = useMemo<IRotaryTimerContext>(
    () => ({
      size,
      ringWidth,

      maxRotation,
      minRotation,

      rotationSharedValue,
      onChange,

      ticksCount,
      tickAngle,
      tickOffsetAngle,
      tickHeight,
      tickWidth,
      tickColor,
      tickSpaceFromRing,
      tickRounding,

      feedbackAngle,
      feedbackTicksCount,
      feedbackOffsetAngle,
      onFeedback,

      snapTicksCount,
      snapAngle,
      snapOffsetAngle,

      markerColor,
      markerSize,

      labelTextStyle,
      labelHideWhenZero,
      renderLabel,

      hintSize,
      hintColor,
      hintHideWhenNotZero,
      hintEnabledRotation,

      isEditable,
      onTouchTimerStart,
      onTouchTimerEnd,
    }),
    [
      size,
      ringWidth,
      rotationSharedValue,
      maxRotation,
      minRotation,

      ticksCount,
      tickAngle,
      tickOffsetAngle,
      tickHeight,
      tickWidth,
      tickColor,
      tickSpaceFromRing,
      tickRounding,

      feedbackAngle,
      feedbackTicksCount,
      feedbackOffsetAngle,
      onFeedback,

      snapTicksCount,
      snapAngle,
      snapOffsetAngle,

      markerColor,
      markerSize,

      labelTextStyle,
      labelHideWhenZero,
      renderLabel,

      hintSize,
      hintColor,
      hintHideWhenNotZero,
      hintEnabledRotation,

      onChange,
      isEditable,
      onTouchTimerStart,
      onTouchTimerEnd,
    ]
  );

  return (
    <RotaryTimerContext.Provider value={value}>
      {children}
    </RotaryTimerContext.Provider>
  );
};

export default React.memo(RotaryTimerProvider);
