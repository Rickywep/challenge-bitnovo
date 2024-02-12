import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import apiBitnovo from '../api/apiBitnovo';
import { Form } from '../components/Form';
import { ButtonBase } from '../components/ButtonBase';
import { Header } from '../components/Header';
import { Currency } from '../types/currencyType';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OrderResponse } from '../types/ordersType';

type Props = NativeStackScreenProps<any>;

export const Payment = ({ navigation }: Props) => {
  const [allCurrencies, setAllCurrencies] = useState<Currency[]>();
  const [currencies, setCurrencies] = useState<Currency[]>();
  const [payment, setPayment] = useState({
    expected_output_amount: 0,
    input_currency: '',
    notes: '',
  });
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadContinue, setLoadContinue] = useState(false);
  const [error, setError] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: '#fff', //isDarkMode ? Colors.darker : Colors.lighter,
  };

  const filterCurrencyAmount = (value: number) => {
    if (value === 0) {
      return setCurrencies(allCurrencies);
    }

    return setCurrencies(
      currencies?.filter(
        currency =>
          value >= Number(currency.min_amount) &&
          value <= Number(currency.max_amount),
      ),
    );
  };

  const onAmountChange = (value: number) => {
    setPayment({ ...payment, expected_output_amount: value });
    filterCurrencyAmount(value);
  };

  const onConceptChange = (value: string) => {
    setPayment({ ...payment, notes: value });
  };

  const getCurrencies = async () => {
    setIsLoading(true);
    try {
      const response = await apiBitnovo.get('currencies');
      setAllCurrencies(response.data);
      setCurrencies(response.data);
      setIsLoading(false);
    } catch (ex) {
      console.error('Error al obtener las monedas', ex);
      setError(true);

      setIsLoading(false);
    }
  };

  const createOrder = async () => {
    setLoadContinue(true);
    try {
      const params = {
        ...payment,
        input_currency: selectedCurrency?.symbol,
        expected_output_amount: Number(payment.expected_output_amount),
      };

      const res = await apiBitnovo.post<OrderResponse>('/orders/', params);
      setLoadContinue(false);
      navigation.navigate('PaymentDetails', {
        paymentId: res.data.identifier,
      });
    } catch (ex) {
      setLoadContinue(false);
    }
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  if (error) {
    return (
      <SafeAreaView style={[backgroundStyle, { flex: 1, padding: 16 }]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>Ha ocurrido un error al obtener las monedas</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView style={[backgroundStyle, { flex: 1, padding: 16 }]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[backgroundStyle, { flex: 1, padding: 16 }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <View
        style={{
          flex: 1,
        }}
      >
        <Header />
        <Form
          currencies={currencies!}
          onAmountChange={onAmountChange}
          onConceptChange={onConceptChange}
          selectedCurrency={selectedCurrency!}
          setSelectedCurrency={setSelectedCurrency}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
          {loadContinue ? (
            <ButtonBase title="Cargando..." disabled onPress={() => {}} />
          ) : (
            <ButtonBase
              title="Continuar"
              onPress={createOrder}
              disabled={
                payment.expected_output_amount === 0 || payment.notes === ''
              }
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
