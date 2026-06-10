import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TransactionItem} from '../../components';
import type {TransactionData} from '../../components';
import {Colors, Typography} from '../../theme';
import {PaymentStackParamList} from '../../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<
    PaymentStackParamList,
    'PaymentHistory'
  >;
};

const MOCK_HISTORY: {month: string; transactions: TransactionData[]}[] = [
  {
    month: 'June 2026',
    transactions: [
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
        type: 'debit',
        title: 'EMI Payment',
        subtitle: 'Loan #LN003 • EMI 2',
        amount: 6100,
        date: '05 Jun',
        status: 'success',
      },
    ],
  },
  {
    month: 'May 2026',
    transactions: [
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
        title: 'EMI Payment',
        subtitle: 'Loan #LN003 • EMI 1',
        amount: 6100,
        date: '05 May',
        status: 'failed',
      },
    ],
  },
  {
    month: 'April 2026',
    transactions: [
      {
        id: '5',
        type: 'debit',
        title: 'EMI Payment',
        subtitle: 'Loan #LN001 • EMI 2',
        amount: 6875,
        date: '15 Apr',
        status: 'success',
      },
    ],
  },
  {
    month: 'March 2026',
    transactions: [
      {
        id: '6',
        type: 'debit',
        title: 'EMI Payment',
        subtitle: 'Loan #LN001 • EMI 1',
        amount: 6875,
        date: '15 Mar',
        status: 'success',
      },
      {
        id: '7',
        type: 'credit',
        title: 'Loan Disbursement',
        subtitle: 'Loan #LN001',
        amount: 75000,
        date: '15 Mar',
        status: 'success',
      },
      {
        id: '8',
        type: 'debit',
        title: 'Processing Fee',
        subtitle: 'Loan #LN001',
        amount: 999,
        date: '15 Mar',
        status: 'success',
      },
    ],
  },
];

const PaymentHistoryScreen: React.FC<Props> = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment History</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Animated.View style={{opacity: fadeAnim}}>
          {MOCK_HISTORY.map((group) => (
            <View key={group.month} style={styles.monthGroup}>
              <Text style={styles.monthLabel}>{group.month}</Text>
              <View style={styles.monthCard}>
                {group.transactions.map((txn) => (
                  <TransactionItem key={txn.id} transaction={txn} />
                ))}
              </View>
            </View>
          ))}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.bgCardLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  backIcon: {fontSize: 20, color: Colors.textPrimary},
  headerTitle: {
    fontSize: Typography.subtitle,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
  },
  placeholder: {width: 40},
  scroll: {flex: 1},
  scrollContent: {paddingHorizontal: 20, paddingBottom: 40},
  monthGroup: {
    marginBottom: 24,
  },
  monthLabel: {
    fontSize: Typography.caption,
    fontWeight: Typography.semiBold,
    color: Colors.textMuted,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  monthCard: {
    backgroundColor: Colors.bgCardLight,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});

export default PaymentHistoryScreen;
