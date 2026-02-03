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
      ticksCount,
      onChange: emitChange,
      onFeedback,
      feedbackTicksCount,
      isEditable,
      renderLabel,
    }),
    [
      size,
      ringWidth,
      rotationSharedValue,
      ticksCount,
      feedbackTicksCount,
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
