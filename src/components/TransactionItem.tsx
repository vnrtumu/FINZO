import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Typography} from '../theme';

export interface TransactionData {
  id: string;
  type: 'credit' | 'debit';
  title: string;
  subtitle: string;
  amount: number;
  date: string;
  status: 'success' | 'failed' | 'pending';
}

interface TransactionItemProps {
  transaction: TransactionData;
}

const getStatusIcon = (type: TransactionData['type']) => {
  return type === 'credit' ? '↓' : '↑';
};

const TransactionItem: React.FC<TransactionItemProps> = ({transaction}) => {
  const isCredit = transaction.type === 'credit';
  const statusColor =
    transaction.status === 'success'
      ? Colors.success
      : transaction.status === 'failed'
      ? Colors.error
      : Colors.warning;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          {backgroundColor: isCredit ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'},
        ]}>
        <Text
          style={[
            styles.icon,
            {color: isCredit ? Colors.success : Colors.error},
          ]}>
          {getStatusIcon(transaction.type)}
        </Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{transaction.title}</Text>
        <Text style={styles.subtitle}>{transaction.subtitle}</Text>
      </View>
      <View style={styles.amountSection}>
        <Text
          style={[
            styles.amount,
            {color: isCredit ? Colors.success : Colors.textPrimary},
          ]}>
          {isCredit ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
        </Text>
        <Text style={[styles.status, {color: statusColor}]}>
          {transaction.date}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 14,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    fontWeight: Typography.bold,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: Typography.caption,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: Typography.small,
    color: Colors.textMuted,
    marginTop: 2,
  },
  amountSection: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: Typography.caption,
    fontWeight: Typography.semiBold,
  },
  status: {
    fontSize: 11,
    marginTop: 2,
  },
});

export default TransactionItem;
