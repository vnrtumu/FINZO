import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from './types';
import {BottomTabBar} from '../components';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import LoanNavigator from './LoanNavigator';
import PaymentNavigator from './PaymentNavigator';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Loans" component={LoanNavigator} />
      <Tab.Screen name="Payments" component={PaymentNavigator} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
