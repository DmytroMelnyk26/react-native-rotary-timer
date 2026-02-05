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
  ticksCount,

  feedbackAngle,
  feedbackTicksCount,
  feedbackOffsetAngle,
  onFeedback,

  snapAngle,
  snapTicksCount,
  snapOffsetAngle,

  rotationSharedValue,
  onChange,
  renderLabel,
  onTouchTimerStart,
  onTouchTimerEnd,
}: RotaryTimerProviderProps) => {
  const value = useMemo<IRotaryTimerContext>(
    () => ({
      size,
      ringWidth,
      rotationSharedValue,
      onChange,
      ticksCount,

      feedbackAngle,
      feedbackTicksCount,
      feedbackOffsetAngle,
      onFeedback,

      snapTicksCount,
      snapAngle,
      snapOffsetAngle,

      isEditable,
      renderLabel,
      onTouchTimerStart,
      onTouchTimerEnd,
    }),
    [
      size,
      ringWidth,
      rotationSharedValue,
      ticksCount,

      feedbackAngle,
      feedbackTicksCount,
      feedbackOffsetAngle,
      onFeedback,

      snapTicksCount,
      snapAngle,
      snapOffsetAngle,

      onChange,
      renderLabel,
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
