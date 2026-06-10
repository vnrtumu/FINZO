import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GradientButton} from '../../components';
import {Colors, Typography} from '../../theme';

const UPCOMING_EMIS = [
  {
    id: '1',
    loanId: 'LN001',
    amount: 6875,
    dueDate: '15 Jul 2026',
    daysLeft: 5,
    status: 'due',
  },
  {
    id: '2',
    loanId: 'LN003',
    amount: 6100,
    dueDate: '05 Jul 2026',
    daysLeft: 0,
    status: 'overdue',
  },
];

const PaymentHomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const totalDue = UPCOMING_EMIS.reduce((sum, e) => sum + e.amount, 0);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Payments</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('PaymentHistory')}
          style={styles.historyBtn}>
          <Text style={styles.historyText}>History</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Animated.View style={{opacity: fadeAnim}}>
          {/* Total Due Card */}
          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>Total Due This Month</Text>
            <Text style={styles.totalAmount}>
              ₹{totalDue.toLocaleString('en-IN')}
            </Text>
            <View style={styles.autoDebitRow}>
              <Text style={styles.autoDebitLabel}>🔄 Auto-debit enabled</Text>
              <View style={styles.toggleTrack}>
                <View style={styles.toggleThumb} />
              </View>
            </View>
          </View>

          {/* Upcoming EMIs */}
          <Text style={styles.sectionTitle}>Upcoming EMIs</Text>
          {UPCOMING_EMIS.map((emi) => (
            <View key={emi.id} style={styles.emiCard}>
              <View style={styles.emiHeader}>
                <View>
                  <Text style={styles.emiLoanId}>Loan #{emi.loanId}</Text>
                  <Text style={styles.emiDate}>Due: {emi.dueDate}</Text>
                </View>
                <View>
                  <Text style={styles.emiAmount}>
                    ₹{emi.amount.toLocaleString('en-IN')}
                  </Text>
                  <Text
                    style={[
                      styles.emiStatus,
                      {
                        color:
                          emi.status === 'overdue'
                            ? Colors.error
                            : Colors.warning,
                      },
                    ]}>
                    {emi.status === 'overdue'
                      ? '⚠️ Overdue'
                      : `${emi.daysLeft} days left`}
                  </Text>
                </View>
              </View>
              <GradientButton
                title="Pay Now"
                onPress={() =>
                  navigation.navigate('MakePayment', {
                    loanId: emi.loanId,
                    amount: emi.amount,
                    emiNumber: 5,
                  })
                }
                style={styles.payBtn}
              />
            </View>
          ))}

          {/* Quick Pay Info */}
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>💡</Text>
            <Text style={styles.infoText}>
              Pay EMIs before the due date to improve your credit score and
              unlock higher credit limits.
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bgDark,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: Typography.title,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  historyBtn: {
    backgroundColor: Colors.bgCardLight,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  historyText: {
    fontSize: Typography.small,
    color: Colors.textSecondary,
    fontWeight: Typography.medium,
  },
  scroll: {flex: 1},
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  // Total Due
  totalCard: {
    backgroundColor: Colors.bgCardLight,
    borderRadius: 22,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  totalLabel: {
    fontSize: Typography.caption,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  autoDebitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  autoDebitLabel: {
    fontSize: Typography.small,
    color: Colors.textSecondary,
  },
  toggleTrack: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.success,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },

  sectionTitle: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
    marginBottom: 14,
  },

  // EMI Card
  emiCard: {
    backgroundColor: Colors.bgCardLight,
    borderRadius: 18,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  emiLoanId: {
    fontSize: Typography.caption,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
  },
  emiDate: {
    fontSize: Typography.small,
    color: Colors.textMuted,
    marginTop: 4,
  },
  emiAmount: {
    fontSize: Typography.subtitle,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    textAlign: 'right',
  },
  emiStatus: {
    fontSize: Typography.small,
    fontWeight: Typography.medium,
    textAlign: 'right',
    marginTop: 4,
  },
  payBtn: {
    height: 48,
  },

  // Info
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.bgCardLight,
    borderRadius: 14,
    padding: 16,
    marginTop: 12,
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
});

export default PaymentHomeScreen;
