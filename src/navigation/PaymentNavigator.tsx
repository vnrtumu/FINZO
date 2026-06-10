import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PaymentStackParamList} from './types';
import {
  PaymentHomeScreen,
  MakePaymentScreen,
  PaymentHistoryScreen,
} from '../screens/payments';
import {Colors} from '../theme';

const Stack = createNativeStackNavigator<PaymentStackParamList>();

const PaymentNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: Colors.bgDark},
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="PaymentHome" component={PaymentHomeScreen} />
      <Stack.Screen name="MakePayment" component={MakePaymentScreen} />
      <Stack.Screen name="PaymentHistory" component={PaymentHistoryScreen} />
    </Stack.Navigator>
  );
};

export default PaymentNavigator;
