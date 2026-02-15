import React from 'react';
import { StyleSheet } from 'react-native';
import Svg from 'react-native-svg';
import { TickItem } from './TickItem';
import { useTicks } from './useTicks';
import type { ITickItemViewProps } from './TickItemView';
import { useRotaryTimer } from '../../hooks';

export interface ITicksProps {
  TickItemComponent?: React.ComponentType<any>;
  TickItemViewComponent?: React.ComponentType<ITickItemViewProps>;
}

export const Ticks = React.memo(
  ({ TickItemComponent = TickItem, TickItemViewComponent }: ITicksProps) => {
    const { size } = useRotaryTimer();
    const ticks = useTicks();

    return (
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        {ticks.map(({ index, angle }) => (
          <TickItemComponent
            key={index}
            index={index}
            angle={angle}
            ViewComponent={TickItemViewComponent}
          />
        ))}
      </Svg>
    );
  }
);
