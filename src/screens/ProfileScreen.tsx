import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Header,
  ExperienceCard,
  LoadingState,
  ErrorState,
} from '../components';
import { useGetUserProfileQuery, useGetExperiencesQuery, useAppDispatch, useAppSelector } from '../redux';
import { toggleTheme, fetchUserSuccess } from '../redux';
import { useTheme } from '../hooks';
import { Experience, MainTabParamList, RootStackParamList } from '../types';
import { BORDER_RADIUS, FONT_SIZE, SPACING } from '../utils/theme';

type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Profile'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type ProfileScreenProps = {
  navigation: ProfileScreenNavigationProp;
};

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { colors, isDark } = useTheme();
  const profile = useAppSelector((state) => state.user.profile);
  const { data, isLoading, error, refetch } = useGetUserProfileQuery();
  const { data: allExperiences } = useGetExperiencesQuery();

  useEffect(() => {
    if (data) {
      dispatch(fetchUserSuccess(data));
    }
  }, [data, dispatch]);

  const joinedExperiences: Experience[] = useMemo(() => {
    if (!profile || !allExperiences) return [];
    const joinedIds = new Set(profile.joinedExperiences.map((e) => e.id));
    return allExperiences.filter((exp) => joinedIds.has(exp.id));
  }, [profile, allExperiences]);

  const handleExperiencePress = (id: string) => {
    navigation.navigate('ExperienceDetails', { experienceId: id });
  };

  if (isLoading) {
    return <LoadingState message="Loading profile..." />;
  }

  if (error || !profile) {
    return <ErrorState message="Could not load profile" onRetry={refetch} />;
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerPadding}>
        <Header
          title="Profile"
          rightAction={{
            icon: isDark ? '☀️' : '🌙',
            onPress: () => dispatch(toggleTheme()),
          }}
        />
      </View>

      <View style={styles.profileSection}>
        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
        <Text style={[styles.name, { color: colors.text }]}>{profile.name}</Text>
        <Text style={[styles.joinedCount, { color: colors.textSecondary }]}>
          {joinedExperiences.length} experiences joined
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Interests</Text>
        <View style={styles.interestsContainer}>
          {profile.interests.map((interest) => (
            <View
              key={interest}
              style={[styles.interestChip, { backgroundColor: colors.primaryLight }]}
            >
              <Text style={[styles.interestText, { color: colors.primary }]}>
                {interest}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Joined Experiences
        </Text>
        {joinedExperiences.length === 0 ? (
          <View style={[styles.emptyJoined, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={styles.emptyIcon}>🎯</Text>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No experiences joined yet. Explore and join your first adventure!
            </Text>
          </View>
        ) : (
          <FlatList
            data={joinedExperiences}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExperienceCard
                experience={item}
                onPress={handleExperiencePress}
                variant="compact"
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.joinedList}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerPadding: {
    paddingHorizontal: SPACING.lg,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: SPACING.lg,
  },
  name: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  joinedCount: {
    fontSize: FONT_SIZE.sm,
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xxl,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    marginBottom: SPACING.lg,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  interestChip: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
  },
  interestText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
  },
  joinedList: {
    paddingRight: SPACING.lg,
    gap: SPACING.xxl,
  },
  emptyJoined: {
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    padding: SPACING.xxl,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: SPACING.md,
  },
  emptyText: {
    fontSize: FONT_SIZE.md,
    textAlign: 'center',
    lineHeight: 22,
  },
});
