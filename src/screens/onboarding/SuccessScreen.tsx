import React, {useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CommonActions} from '@react-navigation/native';
import {GradientButton} from '../../components';
import {Colors, Typography} from '../../theme';
import {OnboardingStackParamList} from '../../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Success'>;
};

const SuccessScreen: React.FC<Props> = ({navigation}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const confettiAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 60,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Confetti particles animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(confettiAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(confettiAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View style={styles.screen}>
      {/* Animated Background Dots */}
      {[...Array(6)].map((_, i) => (
        <Animated.View
          key={i}
          style={[
            styles.particle,
            {
              top: `${15 + i * 12}%`,
              left: `${10 + (i * 17) % 80}%`,
              opacity: confettiAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.2, 0.6, 0.2],
              }),
              transform: [
                {
                  translateY: confettiAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -20],
                  }),
                },
              ],
            },
          ]}
        />
      ))}

      <View style={styles.content}>
        {/* Success Circle */}
        <Animated.View
          style={[
            styles.successCircle,
            {transform: [{scale: scaleAnim}]},
          ]}>
          <View style={styles.innerCircle}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
        </Animated.View>

        <Animated.View style={{opacity: fadeAnim, alignItems: 'center'}}>
          <Text style={styles.title}>Registration Complete!</Text>
          <Text style={styles.subtitle}>
            Your application is under review. We'll notify you about your credit
            eligibility within 24 hours.
          </Text>

          {/* Status Cards */}
          <View style={styles.statusContainer}>
            {[
              {icon: '📱', label: 'Mobile', status: 'Verified'},
              {icon: '🪪', label: 'KYC', status: 'Verified'},
              {icon: '🏦', label: 'Bank', status: 'Linked'},
              {icon: '📊', label: 'Credit', status: 'Under Review'},
            ].map((item, index) => (
              <View key={index} style={styles.statusCard}>
                <Text style={styles.statusIcon}>{item.icon}</Text>
                <Text style={styles.statusLabel}>{item.label}</Text>
                <Text
                  style={[
                    styles.statusText,
                    item.status === 'Under Review' && styles.statusPending,
                  ]}>
                  {item.status}
                </Text>
              </View>
            ))}
          </View>

          <GradientButton
            title="Go to Dashboard"
            onPress={() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'MainApp'}],
                }),
              );
            }}
            style={styles.dashboardBtn}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bgDark,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  particle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primaryStart,
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 2,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 40,
    color: Colors.success,
    fontWeight: Typography.bold,
  },
  title: {
    fontSize: Typography.title,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 36,
    paddingHorizontal: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 36,
    width: '100%',
  },
  statusCard: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: Colors.bgCardLight,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statusIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: Typography.small,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  statusText: {
    fontSize: Typography.caption,
    fontWeight: Typography.semiBold,
    color: Colors.success,
  },
  statusPending: {
    color: Colors.warning,
  },
  dashboardBtn: {
    width: '100%',
  },
});

export default SuccessScreen;
