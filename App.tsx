/**
 * SmartCredit - Digital Lending Platform
 * Full App with Onboarding + Dashboard
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {RootNavigator} from './src/navigation';
import {Colors} from './src/theme';

const DarkNavTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primaryStart,
    background: Colors.bgDark,
    card: Colors.bgCard,
    text: Colors.textPrimary,
    border: Colors.border,
    notification: Colors.accent,
  },
};

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgDark} />
      <NavigationContainer theme={DarkNavTheme}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;

