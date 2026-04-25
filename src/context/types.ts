import type { IRotaryTimerCoreContext } from './RotaryTimerCoreContext';
import type { IRotaryTimerCallbacksContext } from './RotaryTimerCallbacksContext';
import type { IRotaryTimerSnapProps } from '../types';
import type { IRotaryTimerFeedbackContext } from './RotaryTimerFeedbackContext';
import type { IRotaryTimerTicksProps } from '../types';
import type { IRotaryTimerAppearanceContext } from './RotaryTimerAppearanceContext';

export interface IRotaryTimerContext
  extends IRotaryTimerCoreContext,
    IRotaryTimerCallbacksContext,
    IRotaryTimerSnapProps,
    IRotaryTimerFeedbackContext,
    IRotaryTimerTicksProps,
    IRotaryTimerAppearanceContext {}
