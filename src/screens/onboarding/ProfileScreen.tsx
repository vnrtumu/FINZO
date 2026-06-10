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
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Profile'>;
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

const ProfileScreen: React.FC<Props> = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
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

  const handleContinue = () => {
    navigation.navigate('PAN');
  };

  return (
    <View style={styles.screen}>
      <ProgressHeader
        currentStep={2}
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
                  <Text style={styles.iconEmoji}>👤</Text>
                </View>
              </View>

              <Text style={styles.title}>Personal Information</Text>
              <Text style={styles.subtitle}>
                Tell us a bit about yourself. This helps us personalize your
                experience.
              </Text>

              <StyledInput
                label="Full Name (as per PAN)"
                placeholder="John Doe"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />

              <StyledInput
                label="Email Address"
                placeholder="john@example.com"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />

              <StyledInput
                label="Date of Birth (DD/MM/YYYY)"
                placeholder="01/01/1990"
                keyboardType="number-pad"
                value={dob}
                onChangeText={(text) => {
                  // Auto-format date
                  const cleaned = text.replace(/\D/g, '');
                  let formatted = cleaned;
                  if (cleaned.length > 2) {
                    formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
                  }
                  if (cleaned.length > 4) {
                    formatted =
                      cleaned.slice(0, 2) +
                      '/' +
                      cleaned.slice(2, 4) +
                      '/' +
                      cleaned.slice(4, 8);
                  }
                  setDob(formatted);
                }}
                maxLength={10}
              />

              {/* Gender Selection */}
              <Text style={styles.genderLabel}>Gender</Text>
              <View style={styles.genderRow}>
                {['Male', 'Female', 'Other'].map((g) => (
                  <GradientButton
                    key={g}
                    title={g}
                    variant={gender === g ? 'primary' : 'outline'}
                    onPress={() => setGender(g)}
                    style={styles.genderBtn}
                    textStyle={styles.genderBtnText}
                  />
                ))}
              </View>

              <View style={styles.buttonRow}>
                <GradientButton
                  title="Back"
                  variant="secondary"
                  onPress={() => navigation.goBack()}
                  style={styles.backBtn}
                />
                <GradientButton
                  title="Continue"
                  onPress={handleContinue}
                  disabled={!fullName || !email}
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
  genderLabel: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    marginBottom: 8,
    fontWeight: Typography.medium,
  },
  genderRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  genderBtn: {
    flex: 1,
    height: 46,
  },
  genderBtnText: {
    fontSize: Typography.caption,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  backBtn: {
    flex: 0.4,
  },
  nextBtn: {
    flex: 0.6,
  },
});

export default ProfileScreen;
