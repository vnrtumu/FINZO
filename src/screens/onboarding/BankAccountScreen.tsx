import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GradientButton, StyledInput, ProgressHeader, StepContainer} from '../../components';
import {Colors, Typography} from '../../theme';
import {OnboardingStackParamList} from '../../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<
    OnboardingStackParamList,
    'BankAccount'
  >;
};

const STEP_LABELS = [
  'Mobile OTP',
  'Profile',
  'PAN',
  'Aadhaar',
  'Selfie',
  'Employment',
  'Bank Account',
];

const BankAccountScreen: React.FC<Props> = ({navigation}) => {
  const [accNumber, setAccNumber] = useState('');
  const [confirmAcc, setConfirmAcc] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [bankName, setBankName] = useState('');
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Simulated IFSC lookup
  useEffect(() => {
    if (ifsc.length === 11) {
      setBankName('State Bank of India - Main Branch');
    } else {
      setBankName('');
    }
  }, [ifsc]);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Success');
    }, 2000);
  };

  const accountsMatch =
    accNumber.length > 0 &&
    confirmAcc.length > 0 &&
    accNumber === confirmAcc;

  return (
    <View style={styles.screen}>
      <ProgressHeader
        currentStep={7}
        totalSteps={7}
        stepLabels={STEP_LABELS}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <StepContainer>
            <Animated.View
              style={{opacity: fadeAnim, transform: [{translateY: slideAnim}]}}>
              <View style={styles.iconContainer}>
                <View style={styles.iconCircle}>
                  <Text style={styles.iconEmoji}>🏦</Text>
                </View>
              </View>

              <Text style={styles.title}>Bank Account</Text>
              <Text style={styles.subtitle}>
                Add your primary bank account for loan disbursement and
                repayments.
              </Text>

              <StyledInput
                label="Account Number"
                placeholder="Enter account number"
                keyboardType="number-pad"
                value={accNumber}
                onChangeText={setAccNumber}
                secureTextEntry
              />

              <StyledInput
                label="Confirm Account Number"
                placeholder="Re-enter account number"
                keyboardType="number-pad"
                value={confirmAcc}
                onChangeText={setConfirmAcc}
                error={
                  confirmAcc.length > 0 && !accountsMatch
                    ? 'Account numbers do not match'
                    : undefined
                }
              />

              <StyledInput
                label="IFSC Code"
                placeholder="e.g. SBIN0001234"
                autoCapitalize="characters"
                maxLength={11}
                value={ifsc}
                onChangeText={(text) => setIfsc(text.toUpperCase())}
              />

              {bankName ? (
                <View style={styles.bankInfoCard}>
                  <Text style={styles.bankInfoIcon}>🏛️</Text>
                  <View>
                    <Text style={styles.bankInfoTitle}>{bankName}</Text>
                    <Text style={styles.bankInfoSubtitle}>
                      IFSC: {ifsc}
                    </Text>
                  </View>
                </View>
              ) : null}

              {/* Security Note */}
              <View style={styles.securityNote}>
                <Text style={styles.securityIcon}>🔐</Text>
                <Text style={styles.securityText}>
                  A ₹1 penny drop will be made to verify your account. This
                  amount will be credited back.
                </Text>
              </View>

              <View style={styles.buttonRow}>
                <GradientButton
                  title="Back"
                  variant="secondary"
                  onPress={() => navigation.goBack()}
                  style={styles.backBtn}
                />
                <GradientButton
                  title="Complete Setup"
                  onPress={handleSubmit}
                  loading={loading}
                  disabled={!accountsMatch || ifsc.length < 11}
                  style={styles.nextBtn}
                />
              </View>
            </Animated.View>
          </StepContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bgDark,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  iconEmoji: {
    fontSize: 36,
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
    marginBottom: 32,
    lineHeight: 24,
  },
  bankInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  bankInfoIcon: {
    fontSize: 24,
  },
  bankInfoTitle: {
    fontSize: Typography.caption,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
  },
  bankInfoSubtitle: {
    fontSize: Typography.small,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  securityNote: {
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
  securityIcon: {
    fontSize: 20,
    marginTop: 2,
  },
  securityText: {
    flex: 1,
    fontSize: Typography.small,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  backBtn: {
    flex: 0.4,
  },
  nextBtn: {
    flex: 0.6,
  },
});

export default BankAccountScreen;
