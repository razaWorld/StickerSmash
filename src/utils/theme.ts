import { ThemeColors } from '../types';

export const lightColors: ThemeColors = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#0F172A',
  textSecondary: '#64748B',
  primary: '#6366F1',
  primaryLight: '#EEF2FF',
  border: '#E2E8F0',
  error: '#EF4444',
  success: '#22C55E',
  star: '#F59E0B',
  tabBar: '#FFFFFF',
  tabBarBorder: '#E2E8F0',
  searchBackground: '#F1F5F9',
  categoryActive: '#6366F1',
  categoryInactive: '#F1F5F9',
  shadow: 'rgba(15, 23, 42, 0.08)',
};

export const darkColors: ThemeColors = {
  background: '#0F172A',
  surface: '#1E293B',
  card: '#1E293B',
  text: '#F8FAFC',
  textSecondary: '#94A3B8',
  primary: '#818CF8',
  primaryLight: '#312E81',
  border: '#334155',
  error: '#F87171',
  success: '#4ADE80',
  star: '#FBBF24',
  tabBar: '#1E293B',
  tabBarBorder: '#334155',
  searchBackground: '#334155',
  categoryActive: '#818CF8',
  categoryInactive: '#334155',
  shadow: 'rgba(0, 0, 0, 0.3)',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
} as const;

export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
} as const;
