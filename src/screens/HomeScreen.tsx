import React, { useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Header,
  SearchBar,
  CategoryList,
  ExperienceCard,
  LoadingState,
  ErrorState,
  EmptyState,
} from '../components';
import { useAppDispatch, useAppSelector, useGetExperiencesQuery } from '../redux';
import { setSearchQuery, setSelectedCategory, toggleTheme } from '../redux';
import { useFilteredExperiences, useTheme } from '../hooks';
import { MainTabParamList, RootStackParamList } from '../types';
import { SPACING } from '../utils/theme';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const { refetch, isFetching } = useGetExperiencesQuery();
  const { experiences, loading, error } = useFilteredExperiences();
  const searchQuery = useAppSelector((state) => state.experiences.searchQuery);
  const selectedCategory = useAppSelector((state) => state.experiences.selectedCategory);
  const isDark = useAppSelector((state) => state.user.themeMode === 'dark');

  const handleExperiencePress = useCallback(
    (id: string) => {
      navigation.navigate('ExperienceDetails', { experienceId: id });
    },
    [navigation]
  );

  const handleToggleTheme = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  const handleChangeSearch = useCallback(
    (text: string) => {
      dispatch(setSearchQuery(text));
    },
    [dispatch]
  );

  const handleClearSearch = useCallback(() => {
    dispatch(setSearchQuery(''));
  }, [dispatch]);

  const handleSelectCategory = useCallback(
    (cat: string) => {
      dispatch(setSelectedCategory(cat));
    },
    [dispatch]
  );

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <ExperienceCard experience={item} onPress={handleExperiencePress} />
    ),
    [handleExperiencePress]
  );

  const keyExtractor = useCallback((item: { id: string }) => item.id, []);

  const listHeader = useMemo(
    () => (
      <View style={styles.headerSection}>
        <Header
          title="Explore"
          subtitle="Find local experiences near you"
          rightAction={{
            icon: isDark ? '☀️' : '🌙',
            onPress: handleToggleTheme,
          }}
        />
        <SearchBar
          value={searchQuery}
          onChangeText={handleChangeSearch}
          onClear={handleClearSearch}
        />
        <CategoryList
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
      </View>
    ),
    [
      isDark,
      handleToggleTheme,
      searchQuery,
      handleChangeSearch,
      handleClearSearch,
      selectedCategory,
      handleSelectCategory,
    ]
  );

  if (loading && experiences.length === 0) {
    return <LoadingState message="Discovering experiences..." />;
  }

  if (error && experiences.length === 0) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={experiences}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={
          <EmptyState
            icon="🔍"
            title="No experiences found"
            message="Try adjusting your search or category filter"
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !loading}
            onRefresh={refetch}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={5}
        removeClippedSubviews
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    paddingBottom: SPACING.sm,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
    flexGrow: 1,
  },
});