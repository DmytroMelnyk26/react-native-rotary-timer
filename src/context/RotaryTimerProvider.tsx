import React, { type PropsWithChildren, useMemo } from 'react';
import { RotaryTimerContext } from './RotaryTimerContext';
import type { IRotaryTimerContext } from './types';

interface IRotaryTimerProviderProps
  extends PropsWithChildren,
    IRotaryTimerContext {}

export const RotaryTimerProvider = React.memo(
  ({
    children,
    size,
    isEditable,

    ringWidth,
    ringActiveColor,
    ringInactiveColor,

    initialRotation,
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

    backgroundSize,
    backgroundColor,
    backgroundStyle,

    onChange,
    onTouchStart,
    onTouchEnd,
  }: IRotaryTimerProviderProps) => {
    const value = useMemo<IRotaryTimerContext>(
      () => ({
        size,

        ringWidth,
        ringActiveColor,
        ringInactiveColor,

        maxRotation,
        minRotation,

        initialRotation,
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

        backgroundSize,
        backgroundColor,
        backgroundStyle,

        isEditable,
        onTouchStart,
        onTouchEnd,
      }),
      [
        size,

        ringWidth,
        ringActiveColor,
        ringInactiveColor,

        initialRotation,
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

        backgroundSize,
        backgroundColor,
        backgroundStyle,

        onChange,
        isEditable,
        onTouchStart,
        onTouchEnd,
      ]
    );

    return (
      <RotaryTimerContext.Provider value={value}>
        {children}
      </RotaryTimerContext.Provider>
    );
  }
);
