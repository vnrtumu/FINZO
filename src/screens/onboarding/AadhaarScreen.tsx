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
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Aadhaar'>;
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

const AadhaarScreen: React.FC<Props> = ({navigation}) => {
  const [aadhaar, setAadhaar] = useState('');
  const [aadhaarOtp, setAadhaarOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const otpFadeAnim = useRef(new Animated.Value(0)).current;

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

  const formatAadhaar = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const parts = [];
    for (let i = 0; i < cleaned.length && i < 12; i += 4) {
      parts.push(cleaned.slice(i, i + 4));
    }
    return parts.join(' ');
  };

  const handleSendOTP = () => {
    if (aadhaar.replace(/\s/g, '').length < 12) {return;}
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      Animated.timing(otpFadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, 1200);
  };

  const handleVerify = () => {
    if (aadhaarOtp.length < 6) {return;}
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Selfie');
    }, 1000);
  };

  return (
    <View style={styles.screen}>
      <ProgressHeader
        currentStep={4}
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
                  <Text style={styles.iconEmoji}>🆔</Text>
                </View>
              </View>

              <Text style={styles.title}>Aadhaar KYC</Text>
              <Text style={styles.subtitle}>
                Link your Aadhaar for paperless eKYC verification via UIDAI.
              </Text>

              <StyledInput
                label="Aadhaar Number"
                placeholder="1234 5678 9012"
                keyboardType="number-pad"
                maxLength={14}
                value={aadhaar}
                onChangeText={(text) => setAadhaar(formatAadhaar(text))}
              />

              {!otpSent ? (
                <>
                  <GradientButton
                    title="Request Aadhaar OTP"
                    onPress={handleSendOTP}
                    loading={loading}
                    disabled={aadhaar.replace(/\s/g, '').length < 12}
                  />
                  <GradientButton
                    title="Back"
                    variant="outline"
                    onPress={() => navigation.goBack()}
                    style={styles.backBtnSolo}
                  />
                </>
              ) : (
                <Animated.View style={{opacity: otpFadeAnim}}>
                  <View style={styles.otpSentBadge}>
                    <Text style={styles.otpSentText}>
                      ✓ OTP sent to Aadhaar-linked mobile
                    </Text>
                  </View>
                  <StyledInput
                    label="Enter Aadhaar OTP"
                    placeholder="6-digit OTP from UIDAI"
                    keyboardType="number-pad"
                    maxLength={6}
                    value={aadhaarOtp}
                    onChangeText={setAadhaarOtp}
                  />

                  <View style={styles.consentCard}>
                    <Text style={styles.consentIcon}>📋</Text>
                    <Text style={styles.consentText}>
                      By proceeding, you consent to share your Aadhaar details
                      with SmartCredit for KYC verification as per UIDAI
                      guidelines.
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
                      title="Verify eKYC"
                      onPress={handleVerify}
                      loading={loading}
                      disabled={aadhaarOtp.length < 6}
                      style={styles.nextBtn}
                    />
                  </View>
                </Animated.View>
              )}
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
  otpSentBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  otpSentText: {
    color: Colors.success,
    fontSize: Typography.caption,
    fontWeight: Typography.medium,
  },
  consentCard: {
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
  consentIcon: {
    fontSize: 20,
    marginTop: 2,
  },
  consentText: {
    flex: 1,
    fontSize: Typography.small,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  backBtnSolo: {
    marginTop: 12,
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

export default AadhaarScreen;
