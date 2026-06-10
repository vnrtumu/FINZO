import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import OnboardingNavigator from './OnboardingNavigator';
import MainTabNavigator from './MainTabNavigator';
import {Colors} from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: Colors.bgDark},
        animation: 'fade',
      }}>
      <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      <Stack.Screen
        name="MainApp"
        component={MainTabNavigator}
        options={{gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
