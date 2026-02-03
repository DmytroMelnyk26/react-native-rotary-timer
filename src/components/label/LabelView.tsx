import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Animated, { type AnimatedProps } from 'react-native-reanimated';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export interface ILabelViewProps {
  animatedProps: AnimatedProps<typeof AnimatedTextInput>;
}

const LabelView = ({ animatedProps }: ILabelViewProps) => {
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

export default React.memo(LabelView);
