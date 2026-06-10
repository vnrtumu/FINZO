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
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LoanCard, TransactionItem, CreditGauge} from '../../components';
import type {LoanData, TransactionData} from '../../components';
import {Colors, Typography} from '../../theme';
import {LoanStackParamList} from '../../navigation/types';

// Mock Data
const MOCK_USER = {name: 'Venkat'};

const MOCK_CREDIT = {
  total: 200000,
  used: 75000,
  available: 125000,
};

const MOCK_ACTIVE_LOAN: LoanData = {
  id: 'LN001',
  amount: 75000,
  tenure: 12,
  emiAmount: 6875,
  interestRate: 14.5,
  status: 'active',
  paidEmis: 4,
  totalEmis: 12,
  nextEmiDate: '15 Jul 2026',
  disbursedDate: '15 Mar 2026',
};

const MOCK_TRANSACTIONS: TransactionData[] = [
  {
    id: '1',
    type: 'debit',
    title: 'EMI Payment',
    subtitle: 'Loan #LN001 • EMI 4',
    amount: 6875,
    date: '15 Jun',
    status: 'success',
  },
  {
    id: '2',
    type: 'credit',
    title: 'Loan Disbursement',
    subtitle: 'Loan #LN001',
    amount: 75000,
    date: '15 Mar',
    status: 'success',
  },
  {
    id: '3',
    type: 'debit',
    title: 'EMI Payment',
    subtitle: 'Loan #LN001 • EMI 3',
    amount: 6875,
    date: '15 May',
    status: 'success',
  },
  {
    id: '4',
    type: 'debit',
    title: 'Processing Fee',
    subtitle: 'Loan #LN001',
    amount: 999,
    date: '15 Mar',
    status: 'success',
  },
];

const QUICK_ACTIONS = [
  {id: '1', icon: '💰', label: 'Apply\nLoan', route: 'ApplyLoan'},
  {id: '2', icon: '💸', label: 'Pay\nEMI', route: 'Payments'},
  {id: '3', icon: '📊', label: 'Loan\nHistory', route: 'LoanList'},
  {id: '4', icon: '🎧', label: 'Help &\nSupport', route: 'Support'},
];

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const creditPercentage = (MOCK_CREDIT.used / MOCK_CREDIT.total) * 100;

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Animated.View
          style={{opacity: fadeAnim, transform: [{translateY: slideAnim}]}}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Good morning,</Text>
              <Text style={styles.userName}>{MOCK_USER.name} 👋</Text>
            </View>
            <TouchableOpacity style={styles.notificationBtn}>
              <Text style={styles.notificationIcon}>🔔</Text>
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>

          {/* Credit Limit Card */}
          <View style={styles.creditCard}>
            <View style={styles.creditHeader}>
              <Text style={styles.creditTitle}>Credit Limit</Text>
              <View style={styles.creditBadge}>
                <Text style={styles.creditBadgeText}>Active</Text>
              </View>
            </View>

            <View style={styles.creditAmounts}>
              <View>
                <Text style={styles.creditLabel}>Available</Text>
                <Text style={styles.creditAvailable}>
                  ₹{MOCK_CREDIT.available.toLocaleString('en-IN')}
                </Text>
              </View>
              <View style={styles.creditDivider} />
              <View style={styles.creditRight}>
                <Text style={styles.creditLabel}>Used</Text>
                <Text style={styles.creditUsed}>
                  ₹{MOCK_CREDIT.used.toLocaleString('en-IN')}
                </Text>
              </View>
            </View>

            <View style={styles.creditProgress}>
              <View
                style={[styles.creditProgressFill, {width: `${creditPercentage}%`}]}
              />
            </View>
            <Text style={styles.creditTotal}>
              Total Limit: ₹{MOCK_CREDIT.total.toLocaleString('en-IN')}
            </Text>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsRow}>
            {QUICK_ACTIONS.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickAction}
                activeOpacity={0.7}
                onPress={() => {
                  if (action.route === 'ApplyLoan') {
                    navigation.navigate('Loans', {screen: 'ApplyLoan'});
                  } else if (action.route === 'LoanList') {
                    navigation.navigate('Loans');
                  } else if (action.route === 'Payments') {
                    navigation.navigate('Payments');
                  }
                }}>
                <View style={styles.quickActionIcon}>
                  <Text style={styles.quickActionEmoji}>{action.icon}</Text>
                </View>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Active Loan */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Active Loan</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Loans')}>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
            <LoanCard
              loan={MOCK_ACTIVE_LOAN}
              onPress={() =>
                navigation.navigate('Loans', {
                  screen: 'LoanDetail',
                  params: {loanId: MOCK_ACTIVE_LOAN.id},
                })
              }
            />
          </View>

          {/* Credit Score */}
          <View style={styles.creditScoreCard}>
            <CreditGauge score={742} />
          </View>

          {/* Recent Transactions */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Transactions</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Payments')}>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.transactionsCard}>
              {MOCK_TRANSACTIONS.map((txn) => (
                <TransactionItem key={txn.id} transaction={txn} />
              ))}
            </View>
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
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  greeting: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },
  userName: {
    fontSize: Typography.title,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginTop: 4,
  },
  notificationBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.bgCardLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
  },
  notificationIcon: {
    fontSize: 22,
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.error,
    borderWidth: 2,
    borderColor: Colors.bgCardLight,
  },

  // Credit Card
  creditCard: {
    backgroundColor: Colors.bgCardLight,
    borderRadius: 22,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.primaryStart,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 6,
  },
  creditHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  creditTitle: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textSecondary,
  },
  creditBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  creditBadgeText: {
    fontSize: 11,
    color: Colors.success,
    fontWeight: Typography.semiBold,
  },
  creditAmounts: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  creditLabel: {
    fontSize: Typography.small,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  creditAvailable: {
    fontSize: 26,
    fontWeight: Typography.bold,
    color: Colors.success,
  },
  creditDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
    marginHorizontal: 24,
  },
  creditRight: {
    alignItems: 'flex-end',
    flex: 1,
  },
  creditUsed: {
    fontSize: Typography.subtitle,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  creditProgress: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  creditProgressFill: {
    height: '100%',
    backgroundColor: Colors.primaryStart,
    borderRadius: 3,
  },
  creditTotal: {
    fontSize: Typography.small,
    color: Colors.textMuted,
    textAlign: 'right',
  },

  // Quick Actions
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
    gap: 10,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: Colors.bgCardLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickActionEmoji: {
    fontSize: 24,
  },
  quickActionLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 14,
  },

  // Section
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
  },
  seeAll: {
    fontSize: Typography.caption,
    color: Colors.primaryStart,
    fontWeight: Typography.medium,
  },

  // Credit Score
  creditScoreCard: {
    backgroundColor: Colors.bgCardLight,
    borderRadius: 22,
    padding: 28,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },

  // Transactions
  transactionsCard: {
    backgroundColor: Colors.bgCardLight,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});

export default DashboardScreen;
