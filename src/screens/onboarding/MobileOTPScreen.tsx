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
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'MobileOTP'>;
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

const MobileOTPScreen: React.FC<Props> = ({navigation}) => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
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

  const handleSendOTP = () => {
    if (mobile.length < 10) {return;}
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
    if (otp.length < 4) {return;}
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Profile');
    }, 800);
  };

  return (
    <View style={styles.screen}>
      <ProgressHeader
        currentStep={1}
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
              {/* Illustration / Icon */}
              <View style={styles.iconContainer}>
                <View style={styles.iconCircle}>
                  <Text style={styles.iconEmoji}>📱</Text>
                </View>
              </View>

              <Text style={styles.title}>Verify Your Mobile</Text>
              <Text style={styles.subtitle}>
                Enter your mobile number to get started with SmartCredit.
              </Text>

              <StyledInput
                label="Mobile Number"
                placeholder="Enter 10-digit number"
                keyboardType="phone-pad"
                maxLength={10}
                value={mobile}
                onChangeText={setMobile}
              />

              {!otpSent ? (
                <GradientButton
                  title="Send OTP"
                  onPress={handleSendOTP}
                  loading={loading}
                  disabled={mobile.length < 10}
                />
              ) : (
                <Animated.View style={{opacity: otpFadeAnim}}>
                  <View style={styles.otpSentBadge}>
                    <Text style={styles.otpSentText}>
                      ✓ OTP sent to +91 {mobile}
                    </Text>
                  </View>
                  <StyledInput
                    label="Enter OTP"
                    placeholder="6-digit OTP"
                    keyboardType="number-pad"
                    maxLength={6}
                    value={otp}
                    onChangeText={setOtp}
                  />
                  <GradientButton
                    title="Verify & Continue"
                    onPress={handleVerify}
                    loading={loading}
                    disabled={otp.length < 4}
                  />
                  <GradientButton
                    title="Resend OTP"
                    onPress={handleSendOTP}
                    variant="outline"
                    style={styles.resendBtn}
                  />
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
  resendBtn: {
    marginTop: 12,
  },
});

export default MobileOTPScreen;
