import React, {useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {GradientButton} from '../../components';
import {Colors, Typography} from '../../theme';
import {LoanStackParamList} from '../../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<LoanStackParamList, 'LoanSuccess'>;
  route: RouteProp<LoanStackParamList, 'LoanSuccess'>;
};

const LoanSuccessScreen: React.FC<Props> = ({navigation, route}) => {
  const {loanId, amount} = route.params;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
  }, [scaleAnim, fadeAnim]);

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Animated.View
          style={[styles.successCircle, {transform: [{scale: scaleAnim}]}]}>
          <View style={styles.innerCircle}>
            <Text style={styles.checkmark}>💸</Text>
          </View>
        </Animated.View>

        <Animated.View style={{opacity: fadeAnim, alignItems: 'center'}}>
          <Text style={styles.title}>Loan Disbursed!</Text>
          <Text style={styles.subtitle}>
            ₹{amount.toLocaleString('en-IN')} has been transferred to your bank
            account.
          </Text>

          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Loan ID</Text>
              <Text style={styles.detailValue}>#{loanId}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Amount</Text>
              <Text style={styles.detailValue}>
                ₹{amount.toLocaleString('en-IN')}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Status</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Disbursed ✓</Text>
              </View>
            </View>
            <View style={[styles.detailRow, {borderBottomWidth: 0}]}>
              <Text style={styles.detailLabel}>Bank Account</Text>
              <Text style={styles.detailValue}>****4523</Text>
            </View>
          </View>

          <GradientButton
            title="View Loan Details"
            onPress={() => {
              navigation.popToTop();
              navigation.navigate('LoanDetail', {loanId});
            }}
            style={styles.viewBtn}
          />
          <GradientButton
            title="Back to Home"
            variant="outline"
            onPress={() => navigation.popToTop()}
            style={styles.homeBtn}
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
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    borderWidth: 2,
    borderColor: 'rgba(99, 102, 241, 0.25)',
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 40,
  },
  title: {
    fontSize: Typography.title,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  detailsCard: {
    width: '100%',
    backgroundColor: Colors.bgCardLight,
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  detailLabel: {
    fontSize: Typography.caption,
    color: Colors.textMuted,
  },
  detailValue: {
    fontSize: Typography.caption,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
  },
  statusBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: Typography.small,
    color: Colors.success,
    fontWeight: Typography.semiBold,
  },
  viewBtn: {
    width: '100%',
  },
  homeBtn: {
    width: '100%',
    marginTop: 12,
  },
});

export default LoanSuccessScreen;
