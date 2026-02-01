import React, { type ReactElement } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Animated from 'react-native-reanimated';
import useLabel from '../hooks/useLabel';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const Label = (): ReactElement => {
  const animatedProps = useLabel();

  return (
    <AnimatedTextInput
      animatedProps={animatedProps}
      style={styles.text}
      editable={false}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default React.memo(Label);
