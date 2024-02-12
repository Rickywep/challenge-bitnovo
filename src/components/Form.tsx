import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Currency } from '../types/currencyType';
import { Dropdown } from './Dropdown';

type FormProps = {
  onAmountChange: (value: number) => void;
  currencies: Currency[];
  onConceptChange: (value: string) => void;
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
};
export const Form = ({
  currencies,
  onAmountChange,
  onConceptChange,
  selectedCurrency,
  setSelectedCurrency,
}: FormProps) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filteredCryptocurrencies, setFilteredCryptocurrencies] =
    useState(currencies);

  const onCurrencySelected = (currency: Currency) => {
    setSelectedCurrency(currency);
    setDropdownVisible(false);
  };

  useEffect(() => {
    currencies && setSelectedCurrency(currencies[0]);
    setFilteredCryptocurrencies(currencies);
  }, [currencies, setSelectedCurrency]);

  return (
    <View style={styles.gap}>
      <View>
        <Text style={styles.title}>Importe a pagar</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Añade importe a pagar"
          placeholderTextColor={'#647184'}
          onChangeText={value => onAmountChange(Number(value))}
        />
      </View>

      <Dropdown
        currencies={currencies}
        filteredCryptocurrencies={filteredCryptocurrencies}
        setFilteredCryptocurrencies={setFilteredCryptocurrencies}
        dropdownVisible={dropdownVisible}
        setDropdownVisible={setDropdownVisible}
        selectedCurrency={selectedCurrency!}
        onCurrencySelected={onCurrencySelected}
      />

      <View>
        <Text style={styles.title}>Concepto</Text>
        <TextInput
          style={styles.input}
          placeholder="Añade descripción del pago"
          placeholderTextColor={'#647184'}
          onChangeText={value => onConceptChange(value)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#002859',
  },

  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#E5E9F2',
    borderRadius: 6,
    marginVertical: 4,
    paddingHorizontal: 12,
    color: '#002859',
  },
  gap: {
    gap: 16,
  },
});
