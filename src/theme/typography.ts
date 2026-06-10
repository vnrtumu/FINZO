import {Platform} from 'react-native';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

export const Typography = {
  fontFamily,

  // Sizes
  hero: 32,
  title: 24,
  subtitle: 18,
  body: 16,
  caption: 14,
  small: 12,

  // Weights
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
};
