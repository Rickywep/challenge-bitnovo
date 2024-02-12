import React from 'react';
import { Pressable, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { QRCodeGenerator } from './QrCode';
import { CountUp } from 'use-count-up';
import TimeIcon from '../assets/svg/timerIcon.svg';
import CopyIcon from '../assets/svg/copyIcon.svg';
import Clipboard from '@react-native-clipboard/clipboard';
import dayjs from 'dayjs';
import { getSymbolCurrency } from '../herlpers/formats';

const formatTime = (value: number) =>
  `${Math.floor(value / 60)}`.padStart(2, '0') +
  ' : ' +
  `${Math.floor(value % 60)}`.padStart(2, '0');

type CardPayProps = {
  paymentId: string;
  expiration: string;
  cryptoAmount: number;
  address: string;
  destinationTag?: string;
  symbol: string;
  navigateToError: () => void;
};

export const CardPay = ({
  paymentId,
  expiration,
  cryptoAmount,
  address,
  destinationTag,
  symbol,
  navigateToError,
}: CardPayProps) => {
  const copyText = (text: string) => {
    Clipboard.setString(text);
    ToastAndroid.show('Texto copiado al portapapeles', ToastAndroid.SHORT);
  };

  const countDown = (exp: string) => {
    const now = dayjs();
    const expirationDate = dayjs(exp);
    const duration = expirationDate.diff(now);
    return duration;
  };

  countDown(expiration);

  return (
    <View>
      <Text style={[styles.txt, styles.mv12]}>Realiza el pago</Text>
      <View style={styles.container}>
        <View style={styles.timer}>
          <TimeIcon />
          <Text style={styles.txtColor}>
            <CountUp
              easing="linear"
              formatter={formatTime}
              isCounting
              start={countDown(expiration) / 1000}
              end={1}
              duration={countDown(expiration) / 1000}
              onComplete={navigateToError}
            />
          </Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.roundedButton}>
            <Text style={styles.txtButton}>Smart QR</Text>
          </View>
          {/* <Text>Web3</Text> */}
        </View>
        <QRCodeGenerator data={paymentId} />
        <Pressable onPress={() => copyText(cryptoAmount.toString())}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            <Text style={styles.txtColor}>Enviar</Text>
            <Text style={styles.txtAmount}>
              {cryptoAmount} {getSymbolCurrency(symbol)}
            </Text>
            <CopyIcon />
          </View>
        </Pressable>

        <Pressable onPress={() => copyText(address)}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              width: '80%',
            }}
          >
            <Text style={styles.txtAddress}>{address}</Text>
            <CopyIcon />
          </View>
        </Pressable>
        {destinationTag && (
          <Pressable onPress={() => copyText(destinationTag)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
              }}
            >
              <Text style={styles.txtColor}>
                Etiqueta de destino: {destinationTag}
              </Text>
              <CopyIcon />
            </View>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFC',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    gap: 16,
  },
  txt: {
    fontSize: 16,
    fontWeight: '700',
    color: '#002859',
    paddingHorizontal: 8,
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 16,
  },
  roundedButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    backgroundColor: '#035AC5',
  },
  txtButton: {
    color: 'white',
    fontWeight: '400',
    fontSize: 12,
  },
  mv12: {
    marginVertical: 12,
  },
  txtColor: {
    color: '#002859',
  },
  txtAddress: {
    textAlign: 'center',
    color: '#002859',
  },
  txtAmount: {
    color: '#002859',
    fontWeight: '700',
  },
});
