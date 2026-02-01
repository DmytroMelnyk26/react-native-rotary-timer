import React, { type PropsWithChildren, useMemo } from 'react';
import RotaryTimerContext from './RotaryTimerContext';
import type { IRotaryTimerContext } from './types';
import { useSharedValue } from 'react-native-reanimated';
import useStableCallback from '../hooks/useStableCallback';
import type { Optional } from '../types';

interface RotaryTimerProviderProps
  extends PropsWithChildren,
    Optional<IRotaryTimerContext, 'rotationSharedValue'> {}

const RotaryTimerProvider = ({
  children,
  size,
  ringWidth,
  ticksCount,
  rotationSharedValue: externalRotationSharedValue,
  onChange,
  renderLabel,
}: RotaryTimerProviderProps) => {
  const internalRotationSharedValue = useSharedValue(0);
  const rotationSharedValue =
    externalRotationSharedValue ?? internalRotationSharedValue;

  const emitChange = useStableCallback(onChange);

  const value = useMemo<IRotaryTimerContext>(
    () => ({
      size,
      ringWidth,
      rotationSharedValue,
      ticksCount,
      onChange: emitChange,
      renderLabel,
    }),
    [size, ringWidth, rotationSharedValue, ticksCount, emitChange, renderLabel]
  );

  return (
    <RotaryTimerContext.Provider value={value}>
      {children}
    </RotaryTimerContext.Provider>
  );
};

export default React.memo(RotaryTimerProvider);
