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
import {RouteProp} from '@react-navigation/native';
import {GradientButton} from '../../components';
import {Colors, Typography} from '../../theme';
import {LoanStackParamList} from '../../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<LoanStackParamList, 'LoanDetail'>;
  route: RouteProp<LoanStackParamList, 'LoanDetail'>;
};

const EMI_SCHEDULE = [
  {no: 1, date: '15 Apr 2026', amount: 6875, status: 'paid'},
  {no: 2, date: '15 May 2026', amount: 6875, status: 'paid'},
  {no: 3, date: '15 Jun 2026', amount: 6875, status: 'paid'},
  {no: 4, date: '15 Jul 2026', amount: 6875, status: 'paid'},
  {no: 5, date: '15 Aug 2026', amount: 6875, status: 'upcoming'},
  {no: 6, date: '15 Sep 2026', amount: 6875, status: 'upcoming'},
  {no: 7, date: '15 Oct 2026', amount: 6875, status: 'upcoming'},
  {no: 8, date: '15 Nov 2026', amount: 6875, status: 'upcoming'},
  {no: 9, date: '15 Dec 2026', amount: 6875, status: 'upcoming'},
  {no: 10, date: '15 Jan 2027', amount: 6875, status: 'upcoming'},
  {no: 11, date: '15 Feb 2027', amount: 6875, status: 'upcoming'},
  {no: 12, date: '15 Mar 2027', amount: 6875, status: 'upcoming'},
];

const LoanDetailScreen: React.FC<Props> = ({navigation, route}) => {
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Loan Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Animated.View style={{opacity: fadeAnim}}>
          {/* Summary Card */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Loan Amount</Text>
                <Text style={styles.summaryValue}>₹75,000</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Interest Rate</Text>
                <Text style={styles.summaryValue}>14.5% p.a.</Text>
              </View>
            </View>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Tenure</Text>
                <Text style={styles.summaryValue}>12 months</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Monthly EMI</Text>
                <Text style={styles.summaryValue}>₹6,875</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Disbursed On</Text>
                <Text style={styles.summaryValueSmall}>15 Mar 2026</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Loan ID</Text>
                <Text style={styles.summaryValueSmall}>#LN001</Text>
              </View>
            </View>
          </View>

          {/* Repayment Progress */}
          <View style={styles.progressCard}>
            <Text style={styles.sectionTitle}>Repayment Progress</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, {width: '33%'}]} />
            </View>
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>₹27,500 paid</Text>
              <Text style={styles.progressLabel}>₹55,000 remaining</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <GradientButton
              title="Pay Next EMI"
              onPress={() => {}}
              style={styles.actionBtn}
            />
            <GradientButton
              title="Foreclose"
              variant="outline"
              onPress={() => {}}
              style={styles.actionBtn}
            />
          </View>

          {/* EMI Schedule */}
          <View style={styles.scheduleSection}>
            <Text style={styles.sectionTitle}>EMI Schedule</Text>
            <View style={styles.scheduleCard}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, styles.colNo]}>#</Text>
                <Text style={[styles.tableHeaderText, styles.colDate]}>
                  Due Date
                </Text>
                <Text style={[styles.tableHeaderText, styles.colAmount]}>
                  Amount
                </Text>
                <Text style={[styles.tableHeaderText, styles.colStatus]}>
                  Status
                </Text>
              </View>
              {EMI_SCHEDULE.map((emi) => (
                <View key={emi.no} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.colNo]}>{emi.no}</Text>
                  <Text style={[styles.tableCell, styles.colDate]}>
                    {emi.date}
                  </Text>
                  <Text style={[styles.tableCell, styles.colAmount]}>
                    ₹{emi.amount.toLocaleString('en-IN')}
                  </Text>
                  <View style={styles.colStatus}>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor:
                            emi.status === 'paid'
                              ? 'rgba(16, 185, 129, 0.1)'
                              : 'rgba(148, 163, 184, 0.1)',
                        },
                      ]}>
                      <Text
                        style={[
                          styles.statusText,
                          {
                            color:
                              emi.status === 'paid'
                                ? Colors.success
                                : Colors.textMuted,
                          },
                        ]}>
                        {emi.status === 'paid' ? '✓ Paid' : 'Upcoming'}
                      </Text>
                    </View>
                  </View>
                </View>
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
  backIcon: {
    fontSize: 20,
    color: Colors.textPrimary,
  },
  headerTitle: {
    fontSize: Typography.subtitle,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
  },
  placeholder: {width: 40},
  scroll: {flex: 1},
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // Summary
  summaryCard: {
    backgroundColor: Colors.bgCardLight,
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: Typography.small,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: Typography.subtitle,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  summaryValueSmall: {
    fontSize: Typography.caption,
    fontWeight: Typography.semiBold,
    color: Colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: 16,
  },

  // Progress
  progressCard: {
    backgroundColor: Colors.bgCardLight,
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionTitle: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
    marginBottom: 14,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.success,
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: Typography.small,
    color: Colors.textMuted,
  },

  // Actions
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  actionBtn: {
    flex: 1,
  },

  // Schedule
  scheduleSection: {
    marginBottom: 20,
  },
  scheduleCard: {
    backgroundColor: Colors.bgCardLight,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 4,
  },
  tableHeaderText: {
    fontSize: 11,
    fontWeight: Typography.semiBold,
    color: Colors.textMuted,
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tableCell: {
    fontSize: Typography.small,
    color: Colors.textSecondary,
  },
  colNo: {width: 30},
  colDate: {flex: 1},
  colAmount: {width: 80, textAlign: 'right'},
  colStatus: {width: 80, alignItems: 'flex-end'},
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: Typography.medium,
  },
});

export default LoanDetailScreen;
