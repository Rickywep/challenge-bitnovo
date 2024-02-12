import React from 'react';
import { Text, View } from 'react-native';
import { ButtonBase } from '../components/ButtonBase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SuccessCircle from '../assets/svg/successCircle.svg';

type Props = NativeStackScreenProps<any>;

export const SuccessScreen = ({ navigation }: Props) => {
  const navigateToPayment = () => {
    navigation.popToTop();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        gap: 16,
        padding: 16,
      }}
    >
      <SuccessCircle />
      <Text
        style={{
          color: '#002859',
          fontWeight: '700',
          fontSize: 20,
        }}
      >
        ¡Pago comppletado!
      </Text>
      <Text
        style={{
          textAlign: 'center',
          color: '#002859',
        }}
      >
        El pago se ha realizado con éxito.
      </Text>
      <View style={{ width: '100%', marginTop: 16 }}>
        <ButtonBase title="Crear nuevo pago" onPress={navigateToPayment} />
      </View>
    </View>
  );
};
