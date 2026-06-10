export const Colors = {
  // Primary gradient
  primaryStart: '#6366F1',
  primaryEnd: '#8B5CF6',

  // Accent
  accent: '#3B82F6',
  accentLight: '#60A5FA',

  // Success / Error
  success: '#10B981',
  successLight: '#34D399',
  error: '#EF4444',
  warning: '#F59E0B',

  // Backgrounds
  bgDark: '#0A0E1A',
  bgCard: '#111827',
  bgCardLight: '#1F2937',
  bgInput: '#0F172A',
  bgOverlay: 'rgba(17, 24, 39, 0.85)',

  // Text
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  textInverse: '#0F172A',

  // Borders
  border: 'rgba(255, 255, 255, 0.08)',
  borderFocus: 'rgba(99, 102, 241, 0.5)',

  // Glass
  glassBg: 'rgba(30, 41, 59, 0.6)',
  glassStroke: 'rgba(255, 255, 255, 0.1)',

  // Gradient presets
  gradientPrimary: ['#6366F1', '#8B5CF6'] as const,
  gradientAccent: ['#3B82F6', '#6366F1'] as const,
  gradientSuccess: ['#10B981', '#059669'] as const,
  gradientDark: ['#0A0E1A', '#111827'] as const,
  gradientCard: ['rgba(30, 41, 59, 0.8)', 'rgba(15, 23, 42, 0.9)'] as const,
};
