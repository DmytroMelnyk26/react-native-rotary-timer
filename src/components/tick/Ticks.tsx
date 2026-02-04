import React from 'react';
import Svg from 'react-native-svg';
import { StyleSheet } from 'react-native';
import useRotaryTimer from '../../hooks/useRotaryTimer';
import TickItem from './TickItem';
import useTicks from './useTicks';
import type { ITickItemViewProps } from './TickItemView';

export interface ITicksProps {
  TickItemComponent?: React.ComponentType<any>;
  TickItemViewComponent?: React.ComponentType<ITickItemViewProps>;
}

const Ticks = ({
  TickItemComponent = TickItem,
  TickItemViewComponent,
}: ITicksProps) => {
  const { size } = useRotaryTimer();
  const ticks = useTicks();

  return (
    <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
      {ticks.map((tick) => (
        <TickItemComponent
          key={tick.index}
          index={tick.index}
          angle={tick.angle}
          ViewComponent={TickItemViewComponent}
        />
      ))}
    </Svg>
  );
};

export default React.memo(Ticks);
