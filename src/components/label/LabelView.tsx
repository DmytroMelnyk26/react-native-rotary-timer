import React from 'react';
import { StyleSheet, TextInput, type TextStyle } from 'react-native';
import Animated, {
  type AnimatedProps,
  type AnimatedStyle,
} from 'react-native-reanimated';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export interface ILabelViewProps {
  animatedProps: AnimatedProps<typeof AnimatedTextInput>;
  style?: AnimatedStyle<TextStyle>;
}

const LabelView = ({ animatedProps, style }: ILabelViewProps) => (
  <AnimatedTextInput
    animatedProps={animatedProps}
    style={[styles.text, style]}
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
  },
});

export default React.memo(LabelView);
