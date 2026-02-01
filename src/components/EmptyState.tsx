import React, { type ReactElement } from 'react';
import Animated from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import useEmptyState from '../hooks/useEmptyState';
import { StyleSheet } from 'react-native';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const EmptyState = (): ReactElement => {
  const animatedProps = useEmptyState();

  return (
    <AnimatedSvg
      animatedProps={animatedProps}
      style={styles.emptyState}
      width="200px"
      height="200px"
      fill="none"
      viewBox="0 0 24 24"
    >
      <Path
        d="M 11.5 20.4001 C 16.6944 20.5001 20.5 16.6945 20.5 12.0001 C 20.5 9.1746 19.1213 6.671 17 5.1255 M 13 22.4001 L 11 20.4001 L 13 18.4001 M 12.5 3.6001 C 7.3056 3.5001 3.5 7.3057 3.5 12.0001 C 3.5 14.8256 4.8787 17.3292 7 18.8747 M 11 5.6001 L 13 3.6001 L 11 1.6001"
        stroke="#000000"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </AnimatedSvg>
  );
};

const styles = StyleSheet.create({
  emptyState: {
    position: 'absolute',
  },
});
export default React.memo(EmptyState);
