import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LoanCard} from '../../components';
import type {LoanData} from '../../components';
import {Colors, Typography} from '../../theme';
import {LoanStackParamList} from '../../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<LoanStackParamList, 'LoanList'>;
};

const MOCK_LOANS: LoanData[] = [
  {
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
  },
  {
    id: 'LN002',
    amount: 25000,
    tenure: 6,
    emiAmount: 4375,
    interestRate: 16,
    status: 'completed',
    paidEmis: 6,
    totalEmis: 6,
    nextEmiDate: '-',
    disbursedDate: '10 Aug 2025',
  },
  {
    id: 'LN003',
    amount: 50000,
    tenure: 9,
    emiAmount: 6100,
    interestRate: 15,
    status: 'overdue',
    paidEmis: 2,
    totalEmis: 9,
    nextEmiDate: '05 Jun 2026',
    disbursedDate: '05 Apr 2026',
  },
];

type Filter = 'all' | 'active' | 'completed';

const LoanListScreen: React.FC<Props> = ({navigation}) => {
  const [filter, setFilter] = useState<Filter>('all');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const filteredLoans = MOCK_LOANS.filter((loan) => {
    if (filter === 'all') {return true;}
    if (filter === 'active') {return loan.status === 'active' || loan.status === 'overdue';}
    return loan.status === 'completed';
  });

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>My Loans</Text>
        <TouchableOpacity
          style={styles.applyBtn}
          onPress={() => navigation.navigate('ApplyLoan')}>
          <Text style={styles.applyBtnText}>+ Apply</Text>
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        {(['all', 'active', 'completed'] as Filter[]).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
            onPress={() => setFilter(f)}>
            <Text
              style={[
                styles.filterText,
                filter === f && styles.filterTextActive,
              ]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Animated.View style={{opacity: fadeAnim}}>
          {filteredLoans.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={styles.emptyText}>No loans found</Text>
            </View>
          ) : (
            filteredLoans.map((loan) => (
              <LoanCard
                key={loan.id}
                loan={loan}
                onPress={() =>
                  navigation.navigate('LoanDetail', {loanId: loan.id})
                }
              />
            ))
          )}
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
  applyBtn: {
    backgroundColor: Colors.primaryStart,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  applyBtnText: {
    color: Colors.textPrimary,
    fontSize: Typography.caption,
    fontWeight: Typography.semiBold,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.bgCardLight,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterBtnActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
    borderColor: Colors.primaryStart,
  },
  filterText: {
    fontSize: Typography.small,
    color: Colors.textMuted,
    fontWeight: Typography.medium,
  },
  filterTextActive: {
    color: Colors.primaryStart,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: Typography.body,
    color: Colors.textMuted,
  },
});

export default LoanListScreen;
