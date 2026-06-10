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
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'PAN'>;
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

const PANScreen: React.FC<Props> = ({navigation}) => {
  const [pan, setPan] = useState('');
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const checkAnim = useRef(new Animated.Value(0)).current;

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

  const handleVerify = () => {
    if (pan.length < 10) {return;}
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerified(true);
      Animated.spring(checkAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }).start();

      // Auto advance after animation
      setTimeout(() => {
        navigation.navigate('Aadhaar');
      }, 1200);
    }, 1500);
  };

  return (
    <View style={styles.screen}>
      <ProgressHeader
        currentStep={3}
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
                  <Text style={styles.iconEmoji}>🪪</Text>
                </View>
              </View>

              <Text style={styles.title}>PAN Verification</Text>
              <Text style={styles.subtitle}>
                Your PAN is required for credit assessment and identity
                verification.
              </Text>

              <StyledInput
                label="PAN Number"
                placeholder="ABCDE1234F"
                autoCapitalize="characters"
                maxLength={10}
                value={pan}
                onChangeText={(text) => setPan(text.toUpperCase())}
                editable={!verified}
              />

              {verified && (
                <Animated.View
                  style={[
                    styles.verifiedCard,
                    {
                      opacity: checkAnim,
                      transform: [{scale: checkAnim}],
                    },
                  ]}>
                  <Text style={styles.verifiedIcon}>✓</Text>
                  <View>
                    <Text style={styles.verifiedTitle}>PAN Verified</Text>
                    <Text style={styles.verifiedSubtitle}>
                      Identity confirmed successfully
                    </Text>
                  </View>
                </Animated.View>
              )}

              {/* Info Card */}
              <View style={styles.infoCard}>
                <Text style={styles.infoIcon}>🔒</Text>
                <Text style={styles.infoText}>
                  Your PAN details are encrypted and securely stored as per RBI
                  guidelines.
                </Text>
              </View>

              {!verified && (
                <View style={styles.buttonRow}>
                  <GradientButton
                    title="Back"
                    variant="secondary"
                    onPress={() => navigation.goBack()}
                    style={styles.backBtn}
                  />
                  <GradientButton
                    title="Verify PAN"
                    onPress={handleVerify}
                    loading={loading}
                    disabled={pan.length < 10}
                    style={styles.nextBtn}
                  />
                </View>
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
  verifiedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
    gap: 12,
  },
  verifiedIcon: {
    fontSize: 24,
    color: Colors.success,
    fontWeight: Typography.bold,
  },
  verifiedTitle: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.success,
  },
  verifiedSubtitle: {
    fontSize: Typography.small,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgCardLight,
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoIcon: {
    fontSize: 20,
  },
  infoText: {
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

export default PANScreen;
