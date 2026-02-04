import React, { type PropsWithChildren, useMemo } from 'react';
import RotaryTimerContext from './RotaryTimerContext';
import type { IRotaryTimerContext } from './types';
import useStableCallback from '../hooks/useStableCallback';

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
  rotationSharedValue,
  onChange,
  onFeedback,
  renderLabel,
}: RotaryTimerProviderProps) => {
  const emitChange = useStableCallback(onChange);

  const value = useMemo<IRotaryTimerContext>(
    () => ({
      size,
      ringWidth,
      rotationSharedValue,
      onChange: emitChange,
      onFeedback,
      ticksCount,
      feedbackTicksCount,
      snapTicksCount,
      isEditable,
      renderLabel,
    }),
    [
      size,
      ringWidth,
      rotationSharedValue,
      ticksCount,
      feedbackTicksCount,
      snapTicksCount,
      emitChange,
      onFeedback,
      renderLabel,
      isEditable,
    ]
  );

  return (
    <RotaryTimerContext.Provider value={value}>
      {children}
    </RotaryTimerContext.Provider>
  );
};

export default React.memo(RotaryTimerProvider);
