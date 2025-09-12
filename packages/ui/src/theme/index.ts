import { createTamagui } from '@tamagui/core';
import { config } from '@tamagui/config/v3';

// Sakina brand colors
export const colors = {
  // Primary brand colors
  primary: '#10A6B3', // Teal
  primaryDark: '#0E8A94',
  primaryLight: '#2BB8C4',
  
  // Secondary colors
  secondary: '#1B4965', // Deep blue
  secondaryDark: '#153A52',
  secondaryLight: '#2A5A78',
  
  // Accent colors
  accent: '#E7F7F9', // Soft aqua
  accentDark: '#D1F0F3',
  accentLight: '#F3FAFB',
  
  // Neutral colors
  neutral: '#64748B', // Slate
  neutralDark: '#475569',
  neutralLight: '#94A3B8',
  
  // Background colors
  background: '#FFFFFF',
  backgroundSecondary: '#F8FAFC',
  backgroundTertiary: '#F1F5F9',
  
  // Text colors
  text: '#1E293B',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  textInverse: '#FFFFFF',
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Panic button colors
  panic: '#DC2626', // Red for panic button
  panicHover: '#B91C1C',
  calm: '#10A6B3', // Teal for calm state
  
  // Prayer time colors
  prayer: '#7C3AED', // Purple for prayer times
  prayerLight: '#A78BFA',
  
  // Transparent overlays
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.25)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40,
};

export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};

// Create Tamagui configuration
export const tamaguiConfig = createTamagui({
  ...config,
  themes: {
    ...config.themes,
    light: {
      ...config.themes.light,
      ...colors,
    },
    dark: {
      ...config.themes.dark,
      background: '#0F172A',
      backgroundSecondary: '#1E293B',
      backgroundTertiary: '#334155',
      text: '#F8FAFC',
      textSecondary: '#CBD5E1',
      textMuted: '#94A3B8',
      primary: '#10A6B3',
      secondary: '#1B4965',
      accent: '#E7F7F9',
    },
  },
  tokens: {
    ...config.tokens,
    color: colors,
    space: spacing,
    radius: borderRadius,
    size: spacing,
  },
});

export type TamaguiConfig = typeof tamaguiConfig;

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends TamaguiConfig {}
}
