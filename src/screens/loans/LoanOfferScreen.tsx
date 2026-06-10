import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {GradientButton} from '../../components';
import {Colors, Typography} from '../../theme';
import {LoanStackParamList} from '../../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<LoanStackParamList, 'LoanOffer'>;
  route: RouteProp<LoanStackParamList, 'LoanOffer'>;
};

const LoanOfferScreen: React.FC<Props> = ({navigation, route}) => {
  const {amount, tenure, purpose} = route.params;
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  const interestRate = 14.5;
  const processingFee = Math.round(amount * 0.02);
  const monthlyRate = interestRate / 12 / 100;
  const emi = Math.round(
    (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1),
  );
  const totalPayable = emi * tenure;

  const handleAccept = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('LoanSuccess', {
        loanId: 'LN' + Math.floor(Math.random() * 9999).toString().padStart(4, '0'),
        amount,
      });
    }, 2000);
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{scale: scaleAnim}],
          }}>
          {/* Congrats Header */}
          <View style={styles.congratsSection}>
            <View style={styles.congratsIcon}>
              <Text style={styles.congratsEmoji}>🎉</Text>
            </View>
            <Text style={styles.congratsTitle}>Congratulations!</Text>
            <Text style={styles.congratsSubtitle}>
              You are eligible for a loan
            </Text>
          </View>

          {/* Offer Card */}
          <View style={styles.offerCard}>
            <Text style={styles.offerLabel}>Approved Amount</Text>
            <Text style={styles.offerAmount}>
              ₹{amount.toLocaleString('en-IN')}
            </Text>

            <View style={styles.offerDetails}>
              <View style={styles.offerRow}>
                <Text style={styles.offerDetailLabel}>Interest Rate</Text>
                <Text style={styles.offerDetailValue}>{interestRate}% p.a.</Text>
              </View>
              <View style={styles.offerRow}>
                <Text style={styles.offerDetailLabel}>Tenure</Text>
                <Text style={styles.offerDetailValue}>{tenure} months</Text>
              </View>
              <View style={styles.offerRow}>
                <Text style={styles.offerDetailLabel}>Monthly EMI</Text>
                <Text style={styles.offerDetailValue}>
                  ₹{emi.toLocaleString('en-IN')}
                </Text>
              </View>
              <View style={styles.offerRow}>
                <Text style={styles.offerDetailLabel}>Processing Fee</Text>
                <Text style={styles.offerDetailValue}>
                  ₹{processingFee.toLocaleString('en-IN')}
                </Text>
              </View>
              <View style={[styles.offerRow, styles.offerRowTotal]}>
                <Text style={styles.offerTotalLabel}>Total Repayment</Text>
                <Text style={styles.offerTotalValue}>
                  ₹{totalPayable.toLocaleString('en-IN')}
                </Text>
              </View>
            </View>
          </View>

          {/* Disbursement Info */}
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>🏦</Text>
            <Text style={styles.infoText}>
              The loan amount will be credited to your linked bank account
              ending ****4523 within 30 minutes of acceptance.
            </Text>
          </View>

          <GradientButton
            title="Accept & Disburse"
            onPress={handleAccept}
            loading={loading}
          />
          <GradientButton
            title="Decline Offer"
            variant="outline"
            onPress={() => navigation.goBack()}
            style={styles.declineBtn}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bgDark,
  },
  scroll: {flex: 1},
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  congratsSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  congratsIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  congratsEmoji: {
    fontSize: 40,
  },
  congratsTitle: {
    fontSize: Typography.title,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  congratsSubtitle: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
  },
  offerCard: {
    backgroundColor: Colors.bgCardLight,
    borderRadius: 22,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    alignItems: 'center',
  },
  offerLabel: {
    fontSize: Typography.caption,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  offerAmount: {
    fontSize: 36,
    fontWeight: Typography.bold,
    color: Colors.primaryStart,
    marginBottom: 24,
  },
  offerDetails: {
    width: '100%',
  },
  offerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  offerRowTotal: {
    borderBottomWidth: 0,
    paddingTop: 16,
  },
  offerDetailLabel: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },
  offerDetailValue: {
    fontSize: Typography.caption,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
  },
  offerTotalLabel: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
  },
  offerTotalValue: {
    fontSize: Typography.body,
    fontWeight: Typography.bold,
    color: Colors.primaryStart,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.bgCardLight,
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoIcon: {
    fontSize: 20,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: Typography.small,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  declineBtn: {
    marginTop: 12,
  },
});

export default LoanOfferScreen;
