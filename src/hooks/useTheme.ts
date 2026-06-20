import { useMemo } from 'react';
import { useAppSelector } from '../redux';
import { getThemeColors } from '../utils';
import { ThemeColors } from '../types';

export const useTheme = (): { colors: ThemeColors; isDark: boolean } => {
  const themeMode = useAppSelector((state) => state.user.themeMode);
  const colors = useMemo(() => getThemeColors(themeMode), [themeMode]);
  return { colors, isDark: themeMode === 'dark' };
};
