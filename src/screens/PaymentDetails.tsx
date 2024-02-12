import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { OrderInfo } from '../types/ordersType';
import apiBitnovo from '../api/apiBitnovo';
import { CardDetail } from '../components/CardDetail';
import { CardPay } from '../components/CardPay';

type Props = NativeStackScreenProps<any>;

export const PaymentDetails = ({ navigation, route }: Props) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [messages, setMessages] = useState();

  const { paymentId } = route.params ?? {};
  const [orderInfo, setOrderInfo] = useState<OrderInfo[]>();
  useEffect(() => {
    const ws = new WebSocket(`wss://payments.pre-bnvo.com/ws/${paymentId}/`);
    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };
    ws.onmessage = e => {
      console.log(e.data);
      setMessages(e.data);
    };
    ws.onerror = e => {
      console.log(e.message);
    };
    ws.onclose = e => {
      console.log(e.code, e.reason);
    };
  }, [paymentId]);

  const getOrderInfo = useCallback(async () => {
    try {
      const response = await apiBitnovo.get<OrderInfo[]>(
        `/orders/info/${paymentId}/`,
      );
      setOrderInfo(response.data);
    } catch (error) {
      console.log('🚀 ~ PaymentDetails ~ error:', error);
    }
  }, [paymentId]);

  const navigateToError = () => {
    navigation.navigate('Error');
  };

  useEffect(() => {
    getOrderInfo();
  }, [getOrderInfo]);

  useEffect(() => {
    if (messages) {
      navigation.navigate('Success');
    }
  }, [messages, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'#fff'}
      />
      <ScrollView>
        {orderInfo && (
          <>
            <CardDetail
              amount={orderInfo[0].fiat_amount!}
              currency={orderInfo[0].fiat!}
              concept={orderInfo[0].notes!}
              date={orderInfo[0].created_at!}
            />
            <CardPay
              paymentId={paymentId}
              expiration={orderInfo?.[0].expired_time!}
              cryptoAmount={orderInfo?.[0].crypto_amount!}
              address={orderInfo?.[0].address!}
              destinationTag={orderInfo?.[0].tag_memo!}
              symbol={orderInfo?.[0].currency_id!}
              navigateToError={navigateToError}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
  },
});
