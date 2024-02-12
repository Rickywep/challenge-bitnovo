import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type CardDetailProps = {
  amount: number;
  currency: string;
  concept: string;
  date: string;
};
export const CardDetail = ({
  amount,
  currency,
  concept,
  date,
}: CardDetailProps) => {
  return (
    <>
      <Text style={[styles.txt, styles.mv12]}>Resumen del pedido</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.txt}>Importe:</Text>
          <Text style={styles.subTxt}>€ {amount}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.txt}>Moneda:</Text>
          <Text style={styles.subTxt}>{currency}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.txt}>Comercio:</Text>
          <Text style={styles.subTxt}>Comercio de pruebas</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.txt}>Fecha:</Text>
          <Text style={styles.subTxt}>
            {dayjs(date).format('DD/MM/YYYY HH:mm')}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.txt}>Concepto</Text>
          <Text style={styles.subTxt}>{concept}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#C0CCDA',
    paddingVertical: 12,
  },
  txt: {
    fontSize: 16,
    fontWeight: '700',
    color: '#002859',
    paddingHorizontal: 8,
  },
  subTxt: {
    fontSize: 14,
    color: '#002859',
  },
  card: {
    backgroundColor: '#F9FAFC',
    padding: 16,
    borderRadius: 8,
  },
  mv12: {
    marginVertical: 12,
  },
});
