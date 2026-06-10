import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoanStackParamList} from './types';
import {
  LoanListScreen,
  LoanDetailScreen,
  ApplyLoanScreen,
  LoanOfferScreen,
  LoanSuccessScreen,
} from '../screens/loans';
import {Colors} from '../theme';

const Stack = createNativeStackNavigator<LoanStackParamList>();

const LoanNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: Colors.bgDark},
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="LoanList" component={LoanListScreen} />
      <Stack.Screen name="LoanDetail" component={LoanDetailScreen} />
      <Stack.Screen name="ApplyLoan" component={ApplyLoanScreen} />
      <Stack.Screen name="LoanOffer" component={LoanOfferScreen} />
      <Stack.Screen
        name="LoanSuccess"
        component={LoanSuccessScreen}
        options={{gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};

export default LoanNavigator;
