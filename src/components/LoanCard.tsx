import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Typography} from '../theme';

export interface LoanData {
  id: string;
  amount: number;
  tenure: number;
  emiAmount: number;
  interestRate: number;
  status: 'active' | 'completed' | 'overdue' | 'processing';
  paidEmis: number;
  totalEmis: number;
  nextEmiDate: string;
  disbursedDate: string;
}

interface LoanCardProps {
  loan: LoanData;
  onPress: () => void;
}

const getStatusColor = (status: LoanData['status']) => {
  switch (status) {
    case 'active':
      return Colors.success;
    case 'completed':
      return Colors.accentLight;
    case 'overdue':
      return Colors.error;
    case 'processing':
      return Colors.warning;
  }
};

const getStatusLabel = (status: LoanData['status']) => {
  switch (status) {
    case 'active':
      return 'Active';
    case 'completed':
      return 'Completed';
    case 'overdue':
      return 'Overdue';
    case 'processing':
      return 'Processing';
  }
};

const LoanCard: React.FC<LoanCardProps> = ({loan, onPress}) => {
  const progress = loan.totalEmis > 0 ? loan.paidEmis / loan.totalEmis : 0;
  const statusColor = getStatusColor(loan.status);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <View>
          <Text style={styles.amount}>
            ₹{loan.amount.toLocaleString('en-IN')}
          </Text>
          <Text style={styles.tenure}>
            {loan.tenure} months • {loan.interestRate}% p.a.
          </Text>
        </View>
        <View style={[styles.statusBadge, {backgroundColor: `${statusColor}20`}]}>
          <View style={[styles.statusDot, {backgroundColor: statusColor}]} />
          <Text style={[styles.statusText, {color: statusColor}]}>
            {getStatusLabel(loan.status)}
          </Text>
        </View>
      </View>

      {/* Progress */}
      <View style={styles.progressSection}>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {width: `${progress * 100}%`, backgroundColor: statusColor},
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {loan.paidEmis}/{loan.totalEmis} EMIs paid
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>EMI Amount</Text>
          <Text style={styles.footerValue}>
            ₹{loan.emiAmount.toLocaleString('en-IN')}
          </Text>
        </View>
        <View style={styles.footerRight}>
          <Text style={styles.footerLabel}>Next EMI</Text>
          <Text style={styles.footerValue}>{loan.nextEmiDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bgCardLight,
    borderRadius: 18,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  amount: {
    fontSize: Typography.subtitle,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  tenure: {
    fontSize: Typography.small,
    color: Colors.textMuted,
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 6,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: Typography.semiBold,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressTrack: {
    height: 5,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: Typography.small,
    color: Colors.textMuted,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerRight: {
    alignItems: 'flex-end',
  },
  footerLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  footerValue: {
    fontSize: Typography.caption,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
  },
});

export default LoanCard;
