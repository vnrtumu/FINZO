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
import {RouteProp} from '@react-navigation/native';
import {GradientButton} from '../../components';
import {Colors, Typography} from '../../theme';
import {PaymentStackParamList} from '../../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<PaymentStackParamList, 'MakePayment'>;
  route: RouteProp<PaymentStackParamList, 'MakePayment'>;
};

const PAYMENT_METHODS = [
  {key: 'upi', label: 'UPI', icon: '📱', sub: 'Google Pay, PhonePe'},
  {key: 'netbanking', label: 'Net Banking', icon: '🏦', sub: 'All major banks'},
  {key: 'card', label: 'Debit Card', icon: '💳', sub: 'Visa, Mastercard'},
];

const MakePaymentScreen: React.FC<Props> = ({navigation, route}) => {
  const {loanId, amount, emiNumber} = route.params;
  const [method, setMethod] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const successAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      Animated.spring(successAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }).start();
    }, 2500);
  };

  if (success) {
    return (
      <View style={styles.screen}>
        <View style={styles.successContent}>
          <Animated.View
            style={[
              styles.successCircle,
              {transform: [{scale: successAnim}]},
            ]}>
            <Text style={styles.successEmoji}>✅</Text>
          </Animated.View>
          <Text style={styles.successTitle}>Payment Successful!</Text>
          <Text style={styles.successSubtitle}>
            ₹{amount.toLocaleString('en-IN')} paid for Loan #{loanId}
          </Text>
          <View style={styles.receiptCard}>
            <View style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>Transaction ID</Text>
              <Text style={styles.receiptValue}>TXN{Date.now().toString().slice(-8)}</Text>
            </View>
            <View style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>EMI #</Text>
              <Text style={styles.receiptValue}>{emiNumber}</Text>
            </View>
            <View style={[styles.receiptRow, {borderBottomWidth: 0}]}>
              <Text style={styles.receiptLabel}>Method</Text>
              <Text style={styles.receiptValue}>
                {PAYMENT_METHODS.find((m) => m.key === method)?.label || 'UPI'}
              </Text>
            </View>
          </View>
          <GradientButton
            title="Done"
            onPress={() => navigation.popToTop()}
            style={styles.doneBtn}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Make Payment</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Animated.View style={{opacity: fadeAnim}}>
          {/* Amount Card */}
          <View style={styles.amountCard}>
            <Text style={styles.amountLabel}>Payment Amount</Text>
            <Text style={styles.amountValue}>
              ₹{amount.toLocaleString('en-IN')}
            </Text>
            <Text style={styles.amountSub}>
              Loan #{loanId} • EMI #{emiNumber}
            </Text>
          </View>

          {/* Payment Methods */}
          <Text style={styles.sectionTitle}>Select Payment Method</Text>
          {PAYMENT_METHODS.map((m) => (
            <TouchableOpacity
              key={m.key}
              style={[
                styles.methodCard,
                method === m.key && styles.methodCardActive,
              ]}
              onPress={() => setMethod(m.key)}
              activeOpacity={0.7}>
              <Text style={styles.methodIcon}>{m.icon}</Text>
              <View style={styles.methodInfo}>
                <Text style={styles.methodLabel}>{m.label}</Text>
                <Text style={styles.methodSub}>{m.sub}</Text>
              </View>
              <View
                style={[
                  styles.radio,
                  method === m.key && styles.radioActive,
                ]}>
                {method === m.key && <View style={styles.radioDot} />}
              </View>
            </TouchableOpacity>
          ))}

          <GradientButton
            title={processing ? 'Processing...' : 'Pay ₹' + amount.toLocaleString('en-IN')}
            onPress={handlePay}
            loading={processing}
            disabled={!method}
            style={styles.payBtn}
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
  backIcon: {fontSize: 20, color: Colors.textPrimary},
  headerTitle: {
    fontSize: Typography.subtitle,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
  },
  placeholder: {width: 40},
  scroll: {flex: 1},
  scrollContent: {paddingHorizontal: 20, paddingBottom: 40},

  amountCard: {
    backgroundColor: Colors.bgCardLight,
    borderRadius: 22,
    padding: 28,
    alignItems: 'center',
    marginBottom: 28,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  amountLabel: {
    fontSize: Typography.caption,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 36,
    fontWeight: Typography.bold,
    color: Colors.primaryStart,
    marginBottom: 4,
  },
  amountSub: {
    fontSize: Typography.small,
    color: Colors.textMuted,
  },

  sectionTitle: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
    marginBottom: 14,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgCardLight,
    borderRadius: 16,
    padding: 18,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: Colors.border,
    gap: 14,
  },
  methodCardActive: {
    borderColor: Colors.primaryStart,
    backgroundColor: 'rgba(99, 102, 241, 0.06)',
  },
  methodIcon: {fontSize: 28},
  methodInfo: {flex: 1},
  methodLabel: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
  },
  methodSub: {
    fontSize: Typography.small,
    color: Colors.textMuted,
    marginTop: 2,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: {
    borderColor: Colors.primaryStart,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primaryStart,
  },

  payBtn: {
    marginTop: 24,
  },

  // Success
  successContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successEmoji: {fontSize: 48},
  successTitle: {
    fontSize: Typography.title,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 28,
  },
  receiptCard: {
    width: '100%',
    backgroundColor: Colors.bgCardLight,
    borderRadius: 18,
    padding: 20,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  receiptLabel: {
    fontSize: Typography.caption,
    color: Colors.textMuted,
  },
  receiptValue: {
    fontSize: Typography.caption,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
  },
  doneBtn: {width: '100%'},
});

export default MakePaymentScreen;
