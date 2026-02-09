import BackgroundView, { type IBackgroundViewProps } from './BackgroundView';
import useRotaryTimer from '../../hooks/useRotaryTimer';
import React from 'react';

export interface IBackgroundProps {
  ViewComponent?: React.ComponentType<IBackgroundViewProps>;
}

const Background = ({ ViewComponent = BackgroundView }: IBackgroundProps) => {
  const { backgroundColor, backgroundSize, backgroundStyle } = useRotaryTimer();
  return (
    <ViewComponent
      color={backgroundColor}
      size={backgroundSize}
      style={backgroundStyle}
    />
  );
};

export default React.memo(Background);
