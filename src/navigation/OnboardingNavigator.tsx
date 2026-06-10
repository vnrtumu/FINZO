import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OnboardingStackParamList} from './types';
import {
  MobileOTPScreen,
  ProfileScreen,
  PANScreen,
  AadhaarScreen,
  SelfieScreen,
  EmploymentScreen,
  BankAccountScreen,
  SuccessScreen,
} from '../screens/onboarding';
import {Colors} from '../theme';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: Colors.bgDark},
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="MobileOTP" component={MobileOTPScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="PAN" component={PANScreen} />
      <Stack.Screen name="Aadhaar" component={AadhaarScreen} />
      <Stack.Screen name="Selfie" component={SelfieScreen} />
      <Stack.Screen name="Employment" component={EmploymentScreen} />
      <Stack.Screen name="BankAccount" component={BankAccountScreen} />
      <Stack.Screen
        name="Success"
        component={SuccessScreen}
        options={{gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
