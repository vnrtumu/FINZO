import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Colors, Typography} from '../theme';

const TAB_ICONS: Record<string, {active: string; inactive: string}> = {
  Home: {active: '🏠', inactive: '🏡'},
  Loans: {active: '💰', inactive: '💳'},
  Payments: {active: '💸', inactive: '📋'},
  ProfileTab: {active: '👤', inactive: '👤'},
};

const TAB_LABELS: Record<string, string> = {
  Home: 'Home',
  Loans: 'Loans',
  Payments: 'Payments',
  ProfileTab: 'Profile',
};

const BottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const icons = TAB_ICONS[route.name] || {active: '⚡', inactive: '⚡'};
          const label = TAB_LABELS[route.name] || route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tab}
              onPress={onPress}
              activeOpacity={0.7}>
              {isFocused && <View style={styles.activeIndicator} />}
              <Text style={styles.icon}>{isFocused ? icons.active : icons.inactive}</Text>
              <Text
                style={[
                  styles.label,
                  isFocused ? styles.labelActive : styles.labelInactive,
                ]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgDark,
    paddingBottom: 20,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    flex: 1,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: -12,
    width: 24,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.primaryStart,
    shadowColor: Colors.primaryStart,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 4,
  },
  icon: {
    fontSize: 22,
    marginBottom: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: Typography.medium,
  },
  labelActive: {
    color: Colors.primaryStart,
  },
  labelInactive: {
    color: Colors.textMuted,
  },
});

export default BottomTabBar;
