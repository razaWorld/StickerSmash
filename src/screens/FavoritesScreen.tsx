import React, { useMemo } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Header,
  ExperienceCard,
  LoadingState,
  ErrorState,
  EmptyState,
} from '../components';
import { useGetExperiencesQuery } from '../redux';
import { useAppSelector } from '../redux';
import { useTheme } from '../hooks';
import { MainTabParamList, RootStackParamList } from '../types';
import { SPACING } from '../utils/theme';

type FavoritesScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Favorites'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type FavoritesScreenProps = {
  navigation: FavoritesScreenNavigationProp;
};

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { data: experiences, isLoading, error, refetch } = useGetExperiencesQuery();
  const favoriteIds = useAppSelector((state) => state.favorites.favoriteIds);

  const favoriteExperiences = useMemo(
    () => (experiences ?? []).filter((exp) => favoriteIds.includes(exp.id)),
    [experiences, favoriteIds]
  );

  const handleExperiencePress = (id: string) => {
    navigation.navigate('ExperienceDetails', { experienceId: id });
  };

  if (isLoading) {
    return <LoadingState message="Loading favorites..." />;
  }

  if (error) {
    return <ErrorState message="Could not load favorites" onRetry={refetch} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={favoriteExperiences}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExperienceCard experience={item} onPress={handleExperiencePress} />
        )}
        ListHeaderComponent={
          <Header
            title="Favorites"
            subtitle={`${favoriteExperiences.length} saved experience${favoriteExperiences.length !== 1 ? 's' : ''}`}
          />
        }
        ListEmptyComponent={
          <EmptyState
            icon="💜"
            title="No favorites yet"
            message="Tap the heart on any experience to save it here"
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
    flexGrow: 1,
  },
});
