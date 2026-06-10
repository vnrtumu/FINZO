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
import {GradientButton} from '../../components';
import {Colors, Typography} from '../../theme';
import {LoanStackParamList} from '../../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<LoanStackParamList, 'ApplyLoan'>;
};

const TENURE_OPTIONS = [3, 6, 9, 12, 24];
const PURPOSE_OPTIONS = [
  {key: 'personal', label: 'Personal', icon: '👤'},
  {key: 'medical', label: 'Medical', icon: '🏥'},
  {key: 'education', label: 'Education', icon: '📚'},
  {key: 'travel', label: 'Travel', icon: '✈️'},
  {key: 'home', label: 'Home', icon: '🏠'},
  {key: 'other', label: 'Other', icon: '📦'},
];

const ApplyLoanScreen: React.FC<Props> = ({navigation}) => {
  const [amount, setAmount] = useState(50000);
  const [tenure, setTenure] = useState(12);
  const [purpose, setPurpose] = useState('');
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const interestRate = 14.5;
  const monthlyRate = interestRate / 12 / 100;
  const emi =
    tenure > 0
      ? Math.round(
          (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
            (Math.pow(1 + monthlyRate, tenure) - 1),
        )
      : 0;
  const totalPayable = emi * tenure;
  const totalInterest = totalPayable - amount;

  const handleCheckEligibility = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('LoanOffer', {amount, tenure, purpose});
    }, 1500);
  };

  // Amounts from 5000 to 500000 in increments
  const AMOUNT_STEPS = [5000, 10000, 25000, 50000, 75000, 100000, 150000, 200000, 300000, 500000];
  const currentIndex = AMOUNT_STEPS.findIndex((a) => a >= amount) || 0;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Apply for Loan</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Animated.View style={{opacity: fadeAnim}}>
          {/* Amount Selector */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>How much do you need?</Text>
            <Text style={styles.amountDisplay}>
              ₹{amount.toLocaleString('en-IN')}
            </Text>

            {/* Amount Buttons */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.amountScroll}>
              <View style={styles.amountRow}>
                {AMOUNT_STEPS.map((a) => (
                  <TouchableOpacity
                    key={a}
                    style={[
                      styles.amountChip,
                      amount === a && styles.amountChipActive,
                    ]}
                    onPress={() => setAmount(a)}>
                    <Text
                      style={[
                        styles.amountChipText,
                        amount === a && styles.amountChipTextActive,
                      ]}>
                      ₹{a >= 100000 ? `${a / 100000}L` : `${a / 1000}K`}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Tenure Selector */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Choose Tenure</Text>
            <View style={styles.tenureRow}>
              {TENURE_OPTIONS.map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[
                    styles.tenureBtn,
                    tenure === t && styles.tenureBtnActive,
                  ]}
                  onPress={() => setTenure(t)}>
                  <Text
                    style={[
                      styles.tenureText,
                      tenure === t && styles.tenureTextActive,
                    ]}>
                    {t}
                  </Text>
                  <Text
                    style={[
                      styles.tenureUnit,
                      tenure === t && styles.tenureUnitActive,
                    ]}>
                    months
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* EMI Calculator */}
          <View style={styles.emiCard}>
            <View style={styles.emiRow}>
              <View style={styles.emiItem}>
                <Text style={styles.emiLabel}>Monthly EMI</Text>
                <Text style={styles.emiValue}>
                  ₹{emi.toLocaleString('en-IN')}
                </Text>
              </View>
              <View style={styles.emiDivider} />
              <View style={styles.emiItem}>
                <Text style={styles.emiLabel}>Interest Rate</Text>
                <Text style={styles.emiValue}>{interestRate}%</Text>
              </View>
            </View>
            <View style={styles.emiDividerH} />
            <View style={styles.emiRow}>
              <View style={styles.emiItem}>
                <Text style={styles.emiLabel}>Total Interest</Text>
                <Text style={styles.emiValueSmall}>
                  ₹{totalInterest.toLocaleString('en-IN')}
                </Text>
              </View>
              <View style={styles.emiDivider} />
              <View style={styles.emiItem}>
                <Text style={styles.emiLabel}>Total Payable</Text>
                <Text style={styles.emiValueSmall}>
                  ₹{totalPayable.toLocaleString('en-IN')}
                </Text>
              </View>
            </View>
          </View>

          {/* Purpose */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Loan Purpose</Text>
            <View style={styles.purposeGrid}>
              {PURPOSE_OPTIONS.map((p) => (
                <TouchableOpacity
                  key={p.key}
                  style={[
                    styles.purposeCard,
                    purpose === p.key && styles.purposeCardActive,
                  ]}
                  onPress={() => setPurpose(p.key)}>
                  <Text style={styles.purposeIcon}>{p.icon}</Text>
                  <Text
                    style={[
                      styles.purposeLabel,
                      purpose === p.key && styles.purposeLabelActive,
                    ]}>
                    {p.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <GradientButton
            title="Check Eligibility"
            onPress={handleCheckEligibility}
            loading={loading}
            disabled={!purpose}
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
  card: {
    backgroundColor: Colors.bgCardLight,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardTitle: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  amountDisplay: {
    fontSize: 36,
    fontWeight: Typography.bold,
    color: Colors.primaryStart,
    textAlign: 'center',
    marginBottom: 20,
  },
  amountScroll: {
    marginHorizontal: -8,
  },
  amountRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 4,
  },
  amountChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.bgInput,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  amountChipActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
    borderColor: Colors.primaryStart,
  },
  amountChipText: {
    fontSize: Typography.small,
    color: Colors.textMuted,
    fontWeight: Typography.medium,
  },
  amountChipTextActive: {
    color: Colors.primaryStart,
  },
  tenureRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tenureBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: Colors.bgInput,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  tenureBtnActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
    borderColor: Colors.primaryStart,
  },
  tenureText: {
    fontSize: Typography.subtitle,
    fontWeight: Typography.bold,
    color: Colors.textSecondary,
  },
  tenureTextActive: {
    color: Colors.primaryStart,
  },
  tenureUnit: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
  },
  tenureUnitActive: {
    color: Colors.primaryStart,
  },
  emiCard: {
    backgroundColor: Colors.bgCardLight,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  emiRow: {
    flexDirection: 'row',
  },
  emiItem: {
    flex: 1,
    alignItems: 'center',
  },
  emiLabel: {
    fontSize: Typography.small,
    color: Colors.textMuted,
    marginBottom: 6,
  },
  emiValue: {
    fontSize: Typography.title,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  emiValueSmall: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textSecondary,
  },
  emiDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 16,
  },
  emiDividerH: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 16,
  },
  purposeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  purposeCard: {
    width: '31%',
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: Colors.bgInput,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  purposeCardActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
    borderColor: Colors.primaryStart,
  },
  purposeIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  purposeLabel: {
    fontSize: Typography.small,
    color: Colors.textMuted,
    fontWeight: Typography.medium,
  },
  purposeLabelActive: {
    color: Colors.primaryStart,
  },
});

export default ApplyLoanScreen;
