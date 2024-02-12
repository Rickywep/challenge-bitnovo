import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Currency } from '../types/currencyType';
import ArrowDown from '../assets/svg/arrowDown.svg';
import SearchIcon from '../assets/svg/searchIcon.svg';
import { getNameCurrency, getSymbolCurrency } from '../herlpers/formats';

type DropdownProps = {
  currencies: Currency[];
  dropdownVisible: boolean;
  setDropdownVisible: (visible: boolean) => void;
  selectedCurrency: Currency;
  onCurrencySelected: (currency: Currency) => void;
  filteredCryptocurrencies: Currency[];
  setFilteredCryptocurrencies: (currencies: Currency[]) => void;
};

export const Dropdown = ({
  currencies,
  dropdownVisible,
  setDropdownVisible,
  selectedCurrency,
  onCurrencySelected,
  filteredCryptocurrencies,
  setFilteredCryptocurrencies,
}: DropdownProps) => {


  const searchCurrency = (text: string) => {
    const filteredCurrencies = currencies.filter(currency =>
      currency.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredCryptocurrencies(filteredCurrencies);
  };

  return (
    <View>
      <Text style={styles.title}>Seleccionar moneda</Text>
      {dropdownVisible ? (
        <View
          style={{
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#E5E9F2',
            borderRadius: 6,
            marginVertical: 4,
            paddingHorizontal: 12,
          }}
        >
          <View style={{ marginBottom: 2 }}>
            <SearchIcon width={14} />
          </View>
          <TextInput
            placeholder="Buscar"
            placeholderTextColor={'#647184'}
            onChangeText={text => {
              searchCurrency(text);
            }}
          />
        </View>
      ) : (
        <Pressable
          onPress={() => setDropdownVisible(!dropdownVisible)}
          style={[
            styles.input,
            {
              flexDirection: 'row',
              alignItems: 'center',
            },
          ]}
        >
          {selectedCurrency?.image && (
            <Image
              source={{ uri: selectedCurrency?.image }}
              style={{ width: 20, height: 20, marginRight: 6 }}
            />
          )}

          <Text
            style={{
              fontSize: 14,
              color: '#002859',
              fontWeight: '400',
            }}
          >
            {getNameCurrency(selectedCurrency?.name)}{' '}
            {getSymbolCurrency(selectedCurrency?.symbol)}
          </Text>
          <View style={{ position: 'absolute', right: 12 }}>
            <ArrowDown />
          </View>
        </Pressable>
      )}
      {dropdownVisible && (
        <View style={styles.dropdown}>
          <FlatList
            data={filteredCryptocurrencies}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  onCurrencySelected(item);
                }}
                style={styles.row}
              >
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={styles.imageDropdown}
                  />
                )}
                <View>
                  <Text style={styles.title}>{getNameCurrency(item.name)}</Text>
                  <Text style={styles.symbol}>
                    {getSymbolCurrency(item.symbol)}
                  </Text>
                </View>
              </Pressable>
            )}
            keyExtractor={item => item.name}
          />
        </View>
      )}
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
  },
  symbol: {
    fontSize: 12,
    color: '#647184',
  },
  imageDropdown: {
    width: 32,
    height: 32,
    marginHorizontal: 12,
  },
  row: {
    paddingVertical: 12,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E9F2',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#E5E9F2',
    borderRadius: 8,
    elevation: 4,
    shadowOffset: {
      height: 0,
      width: 4,
    },
    shadowOpacity: 0.1,
  },
});
