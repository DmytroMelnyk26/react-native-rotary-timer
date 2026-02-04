import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Animated, { type AnimatedProps } from 'react-native-reanimated';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export interface ILabelViewProps {
  animatedProps: AnimatedProps<typeof AnimatedTextInput>;
}

const LabelView = ({ animatedProps }: ILabelViewProps) => (
  <AnimatedTextInput
    animatedProps={animatedProps}
    style={styles.text}
    editable={false}
    multiline={false}
    underlineColorAndroid="transparent"
  />
);

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 4,
    minWidth: 80,
  },
});

export default React.memo(LabelView);
