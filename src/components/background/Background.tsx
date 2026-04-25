import React from 'react';
import { BackgroundView, type IBackgroundViewProps } from './BackgroundView';
import { useRotaryTimerAppearance } from '../../hooks';

export interface IBackgroundProps {
  ViewComponent?: React.ComponentType<IBackgroundViewProps>;
}

export const Background = React.memo(
  ({ ViewComponent = BackgroundView }: IBackgroundProps) => {
    const { backgroundColor, backgroundSize, backgroundStyle } =
      useRotaryTimerAppearance();
    return (
      <ViewComponent
        color={backgroundColor}
        size={backgroundSize}
        style={backgroundStyle}
      />
    );
  }
);
