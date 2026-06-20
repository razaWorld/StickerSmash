import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Button, LoadingState, ErrorState } from '../components';
import { useGetExperienceByIdQuery, useAppDispatch } from '../redux';
import { joinExperience } from '../redux';
import { useTheme, useFavorites } from '../hooks';
import { formatDate } from '../utils';
import { RootStackParamList } from '../types';
import { BORDER_RADIUS, FONT_SIZE, SPACING } from '../utils/theme';

type DetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ExperienceDetails'
>;
type DetailsRouteProp = RouteProp<RootStackParamList, 'ExperienceDetails'>;

interface ExperienceDetailsScreenProps {
  navigation: DetailsNavigationProp;
  route: DetailsRouteProp;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ExperienceDetailsScreen: React.FC<ExperienceDetailsScreenProps> = ({
  route,
}) => {
  const { experienceId } = route.params;
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites(experienceId);
  const [joined, setJoined] = useState(false);
  const { data: experience, isLoading, error, refetch } = useGetExperienceByIdQuery(experienceId);

  const handleJoin = () => {
    if (experience) {
      dispatch(joinExperience(experience));
      setJoined(true);
    }
  };

  if (isLoading) {
    return <LoadingState message="Loading experience..." />;
  }

  if (error || !experience) {
    return (
      <ErrorState
        message="Could not load experience details"
        onRetry={refetch}
      />
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: experience.image }}
          style={styles.coverImage}
          resizeMode="cover"
        />
        <View style={[styles.ratingOverlay, { backgroundColor: colors.surface }]}>
          <Text style={[styles.ratingText, { color: colors.text }]}>
            ⭐ {experience.rating.toFixed(1)}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: colors.text }]}>{experience.title}</Text>
          <Text
            style={styles.favoriteToggle}
            onPress={() => toggleFavorite(experienceId)}
          >
            {isFavorite ? '❤️' : '🤍'}
          </Text>
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📅</Text>
            <View>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Date</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {formatDate(experience.date)}
              </Text>
            </View>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📍</Text>
            <View style={styles.infoTextContainer}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Location</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {experience.location}
              </Text>
            </View>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {experience.description}
        </Text>

        <Button
          title={joined ? 'Joined ✓' : 'Join Experience'}
          onPress={handleJoin}
          disabled={joined}
          style={styles.joinButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 280,
  },
  coverImage: {
    width: SCREEN_WIDTH,
    height: '100%',
  },
  ratingOverlay: {
    position: 'absolute',
    bottom: SPACING.lg,
    right: SPACING.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
  },
  ratingText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
  },
  content: {
    padding: SPACING.xl,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  title: {
    flex: 1,
    fontSize: FONT_SIZE.xxl,
    fontWeight: '700',
    lineHeight: 34,
    marginRight: SPACING.md,
  },
  favoriteToggle: {
    fontSize: FONT_SIZE.xl,
    padding: SPACING.xs,
  },
  infoCard: {
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: FONT_SIZE.xl,
    marginRight: SPACING.md,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: FONT_SIZE.md,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginVertical: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: FONT_SIZE.md,
    lineHeight: 24,
    marginBottom: SPACING.xxl,
  },
  joinButton: {
    marginBottom: SPACING.xxl,
  },
});
