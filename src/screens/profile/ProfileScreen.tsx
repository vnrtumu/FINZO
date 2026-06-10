import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {Colors, Typography} from '../../theme';

const KYC_ITEMS = [
  {label: 'PAN Card', status: 'verified', icon: '🪪'},
  {label: 'Aadhaar', status: 'verified', icon: '🆔'},
  {label: 'Selfie', status: 'verified', icon: '📸'},
  {label: 'Bank Account', status: 'verified', icon: '🏦'},
];

const MENU_ITEMS = [
  {icon: '🏦', label: 'Bank Accounts', subtitle: 'Manage linked accounts'},
  {icon: '🔔', label: 'Notifications', subtitle: 'Manage preferences'},
  {icon: '🔒', label: 'Security', subtitle: 'PIN, biometric settings'},
  {icon: '📄', label: 'Documents', subtitle: 'KYC & loan documents'},
  {icon: '🎧', label: 'Help & Support', subtitle: 'FAQs, chat, call us'},
  {icon: 'ℹ️', label: 'About SmartCredit', subtitle: 'Version 1.0.0'},
];

const ProfileScreen: React.FC = () => {
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
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Animated.View style={{opacity: fadeAnim}}>
          {/* Avatar Header */}
          <View style={styles.avatarSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>VR</Text>
            </View>
            <Text style={styles.userName}>Venkat Reddy</Text>
            <Text style={styles.userPhone}>+91 98765 43210</Text>
            <Text style={styles.userEmail}>venkat@example.com</Text>
          </View>

          {/* KYC Status */}
          <View style={styles.kycCard}>
            <Text style={styles.sectionTitle}>KYC Status</Text>
            <View style={styles.kycGrid}>
              {KYC_ITEMS.map((item) => (
                <View key={item.label} style={styles.kycItem}>
                  <Text style={styles.kycIcon}>{item.icon}</Text>
                  <Text style={styles.kycLabel}>{item.label}</Text>
                  <View style={styles.kycBadge}>
                    <Text style={styles.kycBadgeText}>✓</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Account Summary */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>3</Text>
              <Text style={styles.summaryLabel}>Total Loans</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>742</Text>
              <Text style={styles.summaryLabel}>Credit Score</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>₹2L</Text>
              <Text style={styles.summaryLabel}>Credit Limit</Text>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuCard}>
            {MENU_ITEMS.map((item, index) => (
              <TouchableOpacity
                key={item.label}
                style={[
                  styles.menuItem,
                  index === MENU_ITEMS.length - 1 && styles.menuItemLast,
                ]}
                activeOpacity={0.7}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <View style={styles.menuInfo}>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <Text style={styles.menuArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout */}
          <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.7}>
            <Text style={styles.logoutText}>🚪 Logout</Text>
          </TouchableOpacity>

          <Text style={styles.version}>SmartCredit v1.0.0</Text>
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
  scroll: {flex: 1},
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },

  // Avatar
  avatarSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 2,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: Typography.bold,
    color: Colors.primaryStart,
  },
  userName: {
    fontSize: Typography.title,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  userPhone: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: Typography.small,
    color: Colors.textMuted,
  },

  // KYC
  kycCard: {
    backgroundColor: Colors.bgCardLight,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionTitle: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  kycGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  kycItem: {
    alignItems: 'center',
    flex: 1,
  },
  kycIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  kycLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 6,
  },
  kycBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  kycBadgeText: {
    fontSize: 12,
    color: Colors.success,
    fontWeight: Typography.bold,
  },

  // Summary
  summaryRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: Colors.bgCardLight,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryValue: {
    fontSize: Typography.subtitle,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 11,
    color: Colors.textMuted,
  },

  // Menu
  menuCard: {
    backgroundColor: Colors.bgCardLight,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 14,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    fontSize: 22,
  },
  menuInfo: {
    flex: 1,
  },
  menuLabel: {
    fontSize: Typography.body,
    fontWeight: Typography.medium,
    color: Colors.textPrimary,
  },
  menuSubtitle: {
    fontSize: Typography.small,
    color: Colors.textMuted,
    marginTop: 2,
  },
  menuArrow: {
    fontSize: 24,
    color: Colors.textMuted,
  },

  // Logout
  logoutBtn: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.15)',
    marginBottom: 20,
  },
  logoutText: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.error,
  },

  version: {
    textAlign: 'center',
    fontSize: Typography.small,
    color: Colors.textMuted,
  },
});

export default ProfileScreen;
