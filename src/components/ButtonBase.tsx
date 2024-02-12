import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type ButtonBaseProps = {
  onPress: () => void;
  disabled?: boolean;
  title: string;
};
export const ButtonBase = ({ onPress, disabled, title }: ButtonBaseProps) => {
  const bgStyle = disabled
    ? { backgroundColor: '#C6DFFE' }
    : { backgroundColor: '#035AC5' };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, bgStyle]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#035AC5',
    padding: 18,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
