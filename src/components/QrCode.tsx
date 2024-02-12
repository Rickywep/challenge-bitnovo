import React from 'react';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export const QRCodeGenerator = ({ data }) => {
  return (
    <View style={{ padding: 16 }}>
      <QRCode
        value={data}
        size={120}
        color="black"
        backgroundColor="white"
        enableLinearGradient
        linearGradient={['black', '#ff00ff']}
      />
    </View>
  );
};
