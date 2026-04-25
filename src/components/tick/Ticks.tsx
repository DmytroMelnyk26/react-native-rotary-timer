import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import Svg from 'react-native-svg';
import { TickItem } from './TickItem';
import { useTicks } from './useTicks';
import type { ITickItemViewProps } from './TickItemView';
import { useRotaryTimerCore, useRotaryTimerTicks } from '../../hooks';

export interface ITicksProps {
  TickItemComponent?: React.ComponentType<any>;
  TickItemViewComponent?: React.ComponentType<ITickItemViewProps>;
}

export const Ticks = React.memo(
  ({ TickItemComponent = TickItem, TickItemViewComponent }: ITicksProps) => {
    const { size, rotationSharedValue } = useRotaryTimerCore();
    const { tickRotationEnabled } = useRotaryTimerTicks();
    const ticks = useTicks();

    const animatedRotationSharedValue = useDerivedValue(() => {
      if (!tickRotationEnabled) {
        return 0;
      }
      return withSpring(rotationSharedValue.value);
    });

    const animatedStyle = useAnimatedStyle(() => {
      if (!tickRotationEnabled) {
        return {};
      }

      const rotation = animatedRotationSharedValue.value;
      return {
        transform: [{ rotate: `${rotation}rad` }],
      };
    });

    return (
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <Svg width={size} height={size}>
          {ticks.map(({ index, angle }) => (
            <TickItemComponent
              key={index}
              index={index}
              angle={angle}
              ViewComponent={TickItemViewComponent}
            />
          ))}
        </Svg>
      </Animated.View>
    );
  }
);
