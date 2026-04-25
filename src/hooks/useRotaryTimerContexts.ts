import { useContext } from 'react';
import {
  RotaryTimerCoreContext,
  RotaryTimerCallbacksContext,
  RotaryTimerSnapContext,
  RotaryTimerFeedbackContext,
  RotaryTimerTicksContext,
  RotaryTimerAppearanceContext,
  type IRotaryTimerCoreContext,
  type IRotaryTimerCallbacksContext,
  type IRotaryTimerFeedbackContext,
  type IRotaryTimerAppearanceContext,
} from '../context';
import type { IRotaryTimerSnapProps, IRotaryTimerTicksProps } from '../types';

const ERROR = 'must be used within a RotaryTimerProvider';

export const useRotaryTimerCore = (): IRotaryTimerCoreContext => {
  const value = useContext(RotaryTimerCoreContext);
  if (!value) throw new Error(`useRotaryTimerCore ${ERROR}`);
  return value;
};

export const useRotaryTimerCallbacks = (): IRotaryTimerCallbacksContext => {
  const value = useContext(RotaryTimerCallbacksContext);
  if (!value) throw new Error(`useRotaryTimerCallbacks ${ERROR}`);
  return value;
};

export const useRotaryTimerSnap = (): IRotaryTimerSnapProps => {
  const value = useContext(RotaryTimerSnapContext);
  if (!value) throw new Error(`useRotaryTimerSnap ${ERROR}`);
  return value;
};

export const useRotaryTimerFeedback = (): IRotaryTimerFeedbackContext => {
  const value = useContext(RotaryTimerFeedbackContext);
  if (!value) throw new Error(`useRotaryTimerFeedback ${ERROR}`);
  return value;
};

export const useRotaryTimerTicks = (): IRotaryTimerTicksProps => {
  const value = useContext(RotaryTimerTicksContext);
  if (!value) throw new Error(`useRotaryTimerTicks ${ERROR}`);
  return value;
};

export const useRotaryTimerAppearance = (): IRotaryTimerAppearanceContext => {
  const value = useContext(RotaryTimerAppearanceContext);
  if (!value) throw new Error(`useRotaryTimerAppearance ${ERROR}`);
  return value;
};
