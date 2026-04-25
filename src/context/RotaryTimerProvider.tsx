import React, { type PropsWithChildren, useMemo } from 'react';
import { RotaryTimerCoreContext } from './RotaryTimerCoreContext';
import { RotaryTimerCallbacksContext } from './RotaryTimerCallbacksContext';
import { RotaryTimerSnapContext } from './RotaryTimerSnapContext';
import { RotaryTimerFeedbackContext } from './RotaryTimerFeedbackContext';
import { RotaryTimerTicksContext } from './RotaryTimerTicksContext';
import { RotaryTimerAppearanceContext } from './RotaryTimerAppearanceContext';
import type { IRotaryTimerContext } from './types';

interface IRotaryTimerProviderProps
  extends PropsWithChildren,
    IRotaryTimerContext {}

export const RotaryTimerProvider = React.memo(
  ({
    children,
    size,
    ringWidth,
    rotationSharedValue,
    isEditable,
    initialRotation,
    maxRotation,
    minRotation,
    onChange,
    onTouchStart,
    onTouchEnd,
    onFeedback,
    snapAngle,
    snapTicksCount,
    snapOffsetAngle,
    feedbackAngle,
    feedbackTicksCount,
    feedbackOffsetAngle,
    ticksCount,
    tickAngle,
    tickOffsetAngle,
    tickHeight,
    tickWidth,
    tickColor,
    tickRounding,
    tickSpaceFromRing,
    tickRotationEnabled,
    ringActiveColor,
    ringInactiveColor,
    markerSize,
    markerColor,
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
  }: IRotaryTimerProviderProps) => {
    const coreValue = useMemo(
      () => ({
        size,
        ringWidth,
        rotationSharedValue,
        isEditable,
        initialRotation,
        maxRotation,
        minRotation,
      }),
      [
        size,
        ringWidth,
        rotationSharedValue,
        isEditable,
        initialRotation,
        maxRotation,
        minRotation,
      ]
    );

    const callbacksValue = useMemo(
      () => ({ onChange, onTouchStart, onTouchEnd, onFeedback }),
      [onChange, onTouchStart, onTouchEnd, onFeedback]
    );

    const snapValue = useMemo(
      () => ({ snapAngle, snapTicksCount, snapOffsetAngle }),
      [snapAngle, snapTicksCount, snapOffsetAngle]
    );

    const feedbackValue = useMemo(
      () => ({ feedbackAngle, feedbackTicksCount, feedbackOffsetAngle }),
      [feedbackAngle, feedbackTicksCount, feedbackOffsetAngle]
    );

    const ticksValue = useMemo(
      () => ({
        ticksCount,
        tickAngle,
        tickOffsetAngle,
        tickHeight,
        tickWidth,
        tickColor,
        tickRounding,
        tickSpaceFromRing,
        tickRotationEnabled,
      }),
      [
        ticksCount,
        tickAngle,
        tickOffsetAngle,
        tickHeight,
        tickWidth,
        tickColor,
        tickRounding,
        tickSpaceFromRing,
        tickRotationEnabled,
      ]
    );

    const appearanceValue = useMemo(
      () => ({
        ringActiveColor,
        ringInactiveColor,
        markerSize,
        markerColor,
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
      }),
      [
        ringActiveColor,
        ringInactiveColor,
        markerSize,
        markerColor,
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
      ]
    );

    return (
      <RotaryTimerCoreContext.Provider value={coreValue}>
        <RotaryTimerCallbacksContext.Provider value={callbacksValue}>
          <RotaryTimerSnapContext.Provider value={snapValue}>
            <RotaryTimerFeedbackContext.Provider value={feedbackValue}>
              <RotaryTimerTicksContext.Provider value={ticksValue}>
                <RotaryTimerAppearanceContext.Provider value={appearanceValue}>
                  {children}
                </RotaryTimerAppearanceContext.Provider>
              </RotaryTimerTicksContext.Provider>
            </RotaryTimerFeedbackContext.Provider>
          </RotaryTimerSnapContext.Provider>
        </RotaryTimerCallbacksContext.Provider>
      </RotaryTimerCoreContext.Provider>
    );
  }
);
