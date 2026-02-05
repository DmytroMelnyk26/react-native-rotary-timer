import type { SharedValue } from 'react-native-reanimated';
import React from 'react';
import type { IRingProps } from './components/ring/Ring';
import type { IRingViewProps } from './components/ring/RingView';
import type { ITickItemViewProps } from './components/tick/TickItemView';
import type { IMarkerViewProps } from './components/marker/MarkerView';
import type { ILabelViewProps } from './components/label/LabelView';
import type { IHintViewProps } from './components/hint/HintView';
import type { ITickItemProps } from './components/tick/TickItem';
import type { ITicksProps } from './components/tick/Ticks';
import type { IMarkerProps } from './components/marker/Marker';
import type { ILabelProps } from './components/label/Label';
import type { IHintProps } from './components/hint/Hint';

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface IRotaryTimerComponents {
  RingComponent: React.ComponentType<IRingProps>;
  RingViewComponent: React.ComponentType<IRingViewProps>;
  TicksComponent: React.ComponentType<ITicksProps>;
  TickItemComponent: React.ComponentType<ITickItemProps>;
  TickItemViewComponent: React.ComponentType<ITickItemViewProps>;
  MarkerComponent: React.ComponentType<IMarkerProps>;
  MarkerViewComponent: React.ComponentType<IMarkerViewProps>;
  LabelComponent: React.ComponentType<ILabelProps>;
  LabelViewComponent: React.ComponentType<ILabelViewProps>;
  HintComponent: React.ComponentType<IHintProps>;
  HintViewComponent: React.ComponentType<IHintViewProps>;
}

export interface ICommonProps {
  size?: number;
  isEditable?: boolean;
  initialRotation?: number;

  rotationSharedValue?: SharedValue<number>;

  onChange?: (ms: number) => void;
  onTouchTimerStart?: (rad: number) => void;
  onTouchTimerEnd?: (rad: number) => void;
}

export interface ISnapProps {
  snapTicksCount?: number;
  snapAngle?: number;
  snapOffsetAngle?: number;
}

export interface IFeedbackProps {
  feedbackTicksCount?: number;
  feedbackAngle?: number;
  feedbackOffsetAngle?: number;
  onFeedback?: () => void;
}

export interface ITicksExternalProps {
  ticksCount?: number;
  tickAngle?: number;
  tickOffsetAngle?: number;
  tickHeight?: number;
  tickWidth?: number;
  tickColor?: string;
  tickSpaceFromRing?: number;
  tickBorderRadius?: number;
}

export interface IMarkerExternalProps {
  markerSize?: number;
  markerColor?: string;
  markerBorderRadius?: number;
}

export interface ILabelExternalProps {
  labelFontSize?: number;
  labelColor?: string;
  labelFontWeight?: string;
  labelShowOnEmpty?: boolean;
  renderLabel?: (rad: number) => string;
}

export interface IHintExternalProps {
  hintSize?: number;
  hintColor?: string;
  hintShowOnEmpty?: boolean;
}

export interface IRingExternalProps {
  ringWidth?: number;
  ringActiveColor?: string;
  ringInactiveColor?: string;
}

export interface IRotaryTimerProps
  extends ICommonProps,
    ISnapProps,
    IFeedbackProps,
    ITicksExternalProps,
    IMarkerExternalProps,
    ILabelExternalProps,
    IHintExternalProps,
    IRingExternalProps,
    Partial<IRotaryTimerComponents> {}
