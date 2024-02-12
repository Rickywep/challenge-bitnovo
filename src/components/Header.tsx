import React from 'react';
import { Text, View } from 'react-native';

export const Header = () => {
  return (
    <View
      style={{
        marginVertical: 16,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: '700',
          color: '#002859',
        }}
      >
        Crear pago
      </Text>
    </View>
  );
};
