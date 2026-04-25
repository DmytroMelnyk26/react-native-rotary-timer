import { useContext, useMemo } from 'react';
import {
  RotaryTimerCoreContext,
  RotaryTimerCallbacksContext,
  RotaryTimerSnapContext,
  RotaryTimerFeedbackContext,
  RotaryTimerTicksContext,
  RotaryTimerAppearanceContext,
  type IRotaryTimerContext,
} from '../context';

/**
 * @deprecated Use specific hooks instead:
 * useRotaryTimerCore, useRotaryTimerCallbacks, useRotaryTimerSnap,
 * useRotaryTimerFeedback, useRotaryTimerTicks, useRotaryTimerAppearance
 */
export const useRotaryTimer = (): IRotaryTimerContext => {
  const core = useContext(RotaryTimerCoreContext);
  const callbacks = useContext(RotaryTimerCallbacksContext);
  const snap = useContext(RotaryTimerSnapContext);
  const feedback = useContext(RotaryTimerFeedbackContext);
  const ticks = useContext(RotaryTimerTicksContext);
  const appearance = useContext(RotaryTimerAppearanceContext);

  if (!core || !callbacks || !snap || !feedback || !ticks || !appearance) {
    throw new Error('useRotaryTimer must be used within a RotaryTimerProvider');
  }

  return useMemo(
    () => ({
      ...core,
      ...callbacks,
      ...snap,
      ...feedback,
      ...ticks,
      ...appearance,
    }),
    [core, callbacks, snap, feedback, ticks, appearance]
  );
};
