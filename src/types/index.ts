export interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  date: string;
  rating: number;
  category:
    | 'outdoor'
    | 'food'
    | 'nightlife'
    | 'wellness'
    | 'culture'
    | 'adventure'
    | 'workshop'
    | 'family';
}

export type CategoryId =
  | 'all'
  | 'outdoor'
  | 'food'
  | 'nightlife'
  | 'wellness'
  | 'culture'
  | 'adventure'
  | 'workshop'
  | 'family';

export interface Category {
  id: CategoryId;
  label: string;
  icon: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  joinedExperiences: Experience[];
  interests: string[];
}

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export type RootStackParamList = {
  MainTabs: undefined;
  ExperienceDetails: { experienceId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Favorites: undefined;
  Profile: undefined;
};

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  primary: string;
  primaryLight: string;
  border: string;
  error: string;
  success: string;
  star: string;
  tabBar: string;
  tabBarBorder: string;
  searchBackground: string;
  categoryActive: string;
  categoryInactive: string;
  shadow: string;
}
