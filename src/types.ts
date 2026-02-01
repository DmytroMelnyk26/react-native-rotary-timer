import type { SharedValue } from 'react-native-reanimated';
import React from 'react';

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface IRotaryTimerComponents {
  RingComponent: React.ComponentType;
  TicksComponent: React.ComponentType;
  MarkerComponent: React.ComponentType;
  LabelComponent: React.ComponentType;
  EmptyStateComponent: React.ComponentType;
}

export interface IRotaryTimerProps extends Partial<IRotaryTimerComponents> {
  size?: number;
  ringWidth?: number;
  ticksCount?: number;
  rotationSharedValue?: SharedValue<number>;
  onChange?: (ms: number) => void;
  renderLabel?: (rad: number) => string;
}
