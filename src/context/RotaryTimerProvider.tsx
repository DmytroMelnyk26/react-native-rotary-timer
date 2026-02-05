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
  feedbackTicksCount,
  snapTicksCount,
  snapAngle,
  snapOffsetAngle,
  rotationSharedValue,
  onChange,
  onFeedback,
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
      onFeedback,
      ticksCount,
      feedbackTicksCount,
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
      feedbackTicksCount,
      snapTicksCount,
      snapAngle,
      snapOffsetAngle,
      onChange,
      onFeedback,
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
