import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GradientButton, ProgressHeader, StepContainer} from '../../components';
import {Colors, Typography} from '../../theme';
import {OnboardingStackParamList} from '../../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Selfie'>;
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

const SelfieScreen: React.FC<Props> = ({navigation}) => {
  const [captured, setCaptured] = useState(false);
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const captureAnim = useRef(new Animated.Value(0)).current;

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

    // Pulsing animation for camera ring
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    pulseLoop.start();

    return () => {
      pulseLoop.stop();
    };
  }, [fadeAnim, slideAnim, pulseAnim]);

  const handleCapture = () => {
    setLoading(true);
    setTimeout(() => {
      setCaptured(true);
      setLoading(false);
      Animated.spring(captureAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }).start();
    }, 1500);
  };

  const handleContinue = () => {
    navigation.navigate('Employment');
  };

  const cameraRingStyle = [
    styles.cameraRing,
    captured ? styles.cameraRingCaptured : undefined,
    {transform: [{scale: captured ? 1 : pulseAnim}]},
  ];

  return (
    <View style={styles.screen}>
      <ProgressHeader
        currentStep={5}
        totalSteps={7}
        stepLabels={STEP_LABELS}
      />
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}>
        <StepContainer>
          <Animated.View
            style={{opacity: fadeAnim, transform: [{translateY: slideAnim}]}}>
            <Text style={styles.title}>Selfie Verification</Text>
            <Text style={styles.subtitle}>
              Take a quick selfie to verify your identity. Ensure good lighting
              and a clear face.
            </Text>

            {/* Camera Area */}
            <View style={styles.cameraArea}>
              <Animated.View style={cameraRingStyle}>
                <View
                  style={[
                    styles.cameraInner,
                    captured ? styles.cameraInnerCaptured : undefined,
                  ]}>
                  {captured ? (
                    <Animated.View
                      style={{
                        opacity: captureAnim,
                        transform: [{scale: captureAnim}],
                      }}>
                      <Text style={styles.capturedEmoji}>😊</Text>
                      <Text style={styles.capturedText}>Captured!</Text>
                    </Animated.View>
                  ) : (
                    <>
                      <Text style={styles.cameraEmoji}>📸</Text>
                      <Text style={styles.cameraText}>Front Camera</Text>
                    </>
                  )}
                </View>
              </Animated.View>
            </View>

            {/* Tips */}
            <View style={styles.tipsContainer}>
              <Text style={styles.tipsTitle}>Tips for a good selfie:</Text>
              {[
                '☀️  Use natural or bright lighting',
                '🧑  Keep your face centered in the frame',
                '🚫  Remove glasses and hats',
                '📐  Hold the phone at eye level',
              ].map((tip, index) => (
                <Text key={index} style={styles.tipItem}>
                  {tip}
                </Text>
              ))}
            </View>

            {!captured ? (
              <>
                <GradientButton
                  title={loading ? 'Capturing...' : 'Capture Selfie'}
                  onPress={handleCapture}
                  loading={loading}
                />
                <GradientButton
                  title="Back"
                  variant="outline"
                  onPress={() => navigation.goBack()}
                  style={styles.backBtnSolo}
                />
              </>
            ) : (
              <View style={styles.buttonRow}>
                <GradientButton
                  title="Retake"
                  variant="secondary"
                  onPress={() => {
                    setCaptured(false);
                    captureAnim.setValue(0);
                  }}
                  style={styles.backBtn}
                />
                <GradientButton
                  title="Continue"
                  onPress={handleContinue}
                  style={styles.nextBtn}
                />
              </View>
            )}
          </Animated.View>
        </StepContainer>
      </ScrollView>
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
  cameraArea: {
    alignItems: 'center',
    marginBottom: 32,
  },
  cameraRing: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: Colors.primaryStart,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  cameraRingCaptured: {
    borderColor: Colors.success,
  },
  cameraInner: {
    width: '100%',
    height: '100%',
    borderRadius: 90,
    backgroundColor: Colors.bgInput,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraInnerCaptured: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  cameraEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  cameraText: {
    fontSize: Typography.small,
    color: Colors.textMuted,
  },
  capturedEmoji: {
    fontSize: 48,
    textAlign: 'center',
  },
  capturedText: {
    fontSize: Typography.caption,
    color: Colors.success,
    fontWeight: Typography.semiBold,
    marginTop: 4,
    textAlign: 'center',
  },
  tipsContainer: {
    backgroundColor: Colors.bgCardLight,
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tipsTitle: {
    fontSize: Typography.caption,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  tipItem: {
    fontSize: Typography.small,
    color: Colors.textSecondary,
    lineHeight: 24,
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

export default SelfieScreen;
