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

export interface IRotaryTimerProps extends Partial<IRotaryTimerComponents> {
  size?: number;
  isEditable?: boolean;
  ringWidth?: number;
  ticksCount?: number;
  feedbackTicksCount?: number;
  initialRotation?: number;
  rotationSharedValue?: SharedValue<number>;
  onChange?: (ms: number) => void;
  onFeedback?: () => void;
  renderLabel?: (rad: number) => string;
}
