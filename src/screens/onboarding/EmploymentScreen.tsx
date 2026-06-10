import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GradientButton, StyledInput, ProgressHeader, StepContainer} from '../../components';
import {Colors, Typography} from '../../theme';
import {OnboardingStackParamList} from '../../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Employment'>;
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

const EMPLOYMENT_TYPES = [
  {key: 'salaried', label: 'Salaried', icon: '💼'},
  {key: 'self-employed', label: 'Self-Employed', icon: '🏢'},
  {key: 'business', label: 'Business Owner', icon: '📊'},
  {key: 'freelancer', label: 'Freelancer', icon: '💻'},
];

const EmploymentScreen: React.FC<Props> = ({navigation}) => {
  const [empType, setEmpType] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [experience, setExperience] = useState('');
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
    navigation.navigate('BankAccount');
  };

  const formatCurrency = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (!cleaned) {return '';}
    return Number(cleaned).toLocaleString('en-IN');
  };

  return (
    <View style={styles.screen}>
      <ProgressHeader
        currentStep={6}
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
                  <Text style={styles.iconEmoji}>💼</Text>
                </View>
              </View>

              <Text style={styles.title}>Employment Details</Text>
              <Text style={styles.subtitle}>
                Help us understand your income source for better loan offers.
              </Text>

              {/* Employment Type Cards */}
              <Text style={styles.sectionLabel}>Employment Type</Text>
              <View style={styles.typeGrid}>
                {EMPLOYMENT_TYPES.map((type) => (
                  <TouchableOpacity
                    key={type.key}
                    style={[
                      styles.typeCard,
                      empType === type.key && styles.typeCardActive,
                    ]}
                    onPress={() => setEmpType(type.key)}
                    activeOpacity={0.7}>
                    <Text style={styles.typeIcon}>{type.icon}</Text>
                    <Text
                      style={[
                        styles.typeLabel,
                        empType === type.key && styles.typeLabelActive,
                      ]}>
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <StyledInput
                label="Company / Business Name"
                placeholder="Enter company name"
                value={companyName}
                onChangeText={setCompanyName}
                autoCapitalize="words"
              />

              <StyledInput
                label="Monthly Income (₹)"
                placeholder="₹ 50,000"
                keyboardType="number-pad"
                value={monthlyIncome}
                onChangeText={(text) =>
                  setMonthlyIncome(formatCurrency(text))
                }
              />

              <StyledInput
                label="Work Experience (Years)"
                placeholder="e.g. 5"
                keyboardType="number-pad"
                maxLength={2}
                value={experience}
                onChangeText={setExperience}
              />

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
                  disabled={!empType || !monthlyIncome}
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
    marginBottom: 28,
    lineHeight: 24,
  },
  sectionLabel: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    marginBottom: 12,
    fontWeight: Typography.medium,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  typeCard: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: Colors.bgInput,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  typeCardActive: {
    borderColor: Colors.primaryStart,
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
  },
  typeIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  typeLabel: {
    fontSize: Typography.small,
    color: Colors.textSecondary,
    fontWeight: Typography.medium,
  },
  typeLabelActive: {
    color: Colors.primaryStart,
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

export default EmploymentScreen;
