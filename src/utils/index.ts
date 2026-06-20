import { lightColors, darkColors } from '../utils/theme';
import { ThemeMode } from '../types';

export const getThemeColors = (mode: ThemeMode) =>
  mode === 'dark' ? darkColors : lightColors;

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatRating = (rating: number): string => rating.toFixed(1);

export const filterExperiences = <
  T extends { title: string; location: string; description: string; category: string }
>(
  experiences: T[],
  query: string,
  category: string
): T[] => {
  const normalizedQuery = query.trim().toLowerCase();

  return experiences.filter((exp) => {
    const matchesCategory = category === 'all' || exp.category === category;
    const matchesSearch =
      !normalizedQuery ||
      exp.title.toLowerCase().includes(normalizedQuery) ||
      exp.location.toLowerCase().includes(normalizedQuery) ||
      exp.description.toLowerCase().includes(normalizedQuery);
    return matchesCategory && matchesSearch;
  });
};
