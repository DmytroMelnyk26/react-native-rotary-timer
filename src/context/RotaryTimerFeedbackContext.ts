import { createContext } from 'react';

export interface IRotaryTimerFeedbackContext {
  feedbackAngle?: number;
  feedbackTicksCount?: number;
  feedbackOffsetAngle?: number;
}

export const RotaryTimerFeedbackContext =
  createContext<IRotaryTimerFeedbackContext | null>(null);
