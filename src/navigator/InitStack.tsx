import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Payment } from '../screens/Payment';
import { PaymentDetails } from '../screens/PaymentDetails';
import { ErrorScreen } from '../screens/ErrorScreen';
import { SuccessScreen } from '../screens/SuccesScreen';

const Stack = createNativeStackNavigator();

export default function InitStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
      <Stack.Screen name="Error" component={ErrorScreen} />
      <Stack.Screen name="Success" component={SuccessScreen} />
    </Stack.Navigator>
  );
}
