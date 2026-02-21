import React from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import type { AnimatedStyle, SharedValue } from 'react-native-reanimated';
import type {
  IBackgroundProps,
  IBackgroundViewProps,
  IRingProps,
  IRingViewProps,
  ITickItemViewProps,
  IMarkerViewProps,
  ILabelViewProps,
  IHintViewProps,
  ITickItemProps,
  ITicksProps,
  IMarkerProps,
  ILabelProps,
  IHintProps,
} from './components';

export interface IRotaryTimerComponents {
  BackgroundComponent: React.ComponentType<IBackgroundProps>;
  BackgroundViewComponent: React.ComponentType<IBackgroundViewProps>;
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

export interface IRotaryTimerCommonProps {
  ref?: React.Ref<IRotaryTimerRef>;
  size?: number;
  isEditable?: boolean;
  initialRotation?: number;
  minRotation?: number;
  maxRotation?: number;

  rotationSharedValue?: SharedValue<number>;

  onChange?: (rad: number) => void;
  onTouchStart?: (rad: number) => void;
  onTouchEnd?: (rad: number) => void;
}

export interface IRotaryTimerSnapProps {
  snapTicksCount?: number;
  snapAngle?: number;
  snapOffsetAngle?: number;
}

export interface IRotaryTimerFeedbackProps {
  feedbackTicksCount?: number;
  feedbackAngle?: number;
  feedbackOffsetAngle?: number;
  onFeedback?: () => void;
}

export interface IRotaryTimerTicksProps {
  ticksCount?: number;
  tickAngle?: number;
  tickOffsetAngle?: number;
  tickHeight?: number;
  tickWidth?: number;
  tickColor?: string;
  tickSpaceFromRing?: number;
  tickRounding?: number;
}

export interface IRotaryTimerMarkerProps {
  markerSize?: number;
  markerColor?: string;
}

export interface IRotaryTimerLabelProps {
  labelTextStyle?: AnimatedStyle<TextStyle>;
  labelHideWhenZero?: boolean;
  renderLabel?: (rad: number) => string;
}

export interface IRotaryTimerHintProps {
  hintSize?: number;
  hintColor?: string;
  hintHideWhenNotZero?: boolean;
  hintEnabledRotation?: boolean;
}

export interface IRotaryTimerRingProps {
  ringWidth?: number;
  ringActiveColor?: string;
  ringInactiveColor?: string;
}

export interface IRotaryTimerBackgroundProps {
  backgroundColor?: string;
  backgroundSize?: number;
  backgroundStyle?: AnimatedStyle<ViewStyle>;
}

export interface IRotaryTimerRef {
  increaseRotation: (rotation: number) => void;
  reduceRotation: (rotation: number) => void;
  setRotation: (rotation: number) => void;
  reset: () => void;
}

export interface IRotaryTimerProps
  extends IRotaryTimerCommonProps,
    IRotaryTimerSnapProps,
    IRotaryTimerFeedbackProps,
    IRotaryTimerTicksProps,
    IRotaryTimerMarkerProps,
    IRotaryTimerLabelProps,
    IRotaryTimerHintProps,
    IRotaryTimerRingProps,
    IRotaryTimerBackgroundProps,
    Partial<IRotaryTimerComponents> {}
