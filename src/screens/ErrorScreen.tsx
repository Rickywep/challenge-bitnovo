import React from 'react';
import { Text, View } from 'react-native';
import ErrorCicle from '../assets/svg/errorCircle.svg';
import { ButtonBase } from '../components/ButtonBase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any>;

export const ErrorScreen = ({ navigation }: Props) => {
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
      <ErrorCicle />
      <Text
        style={{
          color: '#002859',
        }}
      >
        ¡Pago cancelado!
      </Text>
      <Text
        style={{
          textAlign: 'center',
          color: '#002859',
        }}
      >
        No se ha podido realizar el pago, por favor intenta de nuevo.
      </Text>
      <View style={{ width: '100%', marginTop: 16 }}>
        <ButtonBase title="Crear nuevo pago" onPress={navigateToPayment} />
      </View>
    </View>
  );
};
