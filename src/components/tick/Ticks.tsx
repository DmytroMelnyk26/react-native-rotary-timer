import React from 'react';
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
  const ticks = useTicks();

  return (
    <>
      {ticks.map((tick) => (
        <TickItemComponent
          key={tick.index}
          index={tick.index}
          angle={tick.angle}
          ViewComponent={TickItemViewComponent}
        />
      ))}
    </>
  );
};

export default React.memo(Ticks);
