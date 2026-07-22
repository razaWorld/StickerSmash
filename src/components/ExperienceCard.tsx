import React, { memo, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Experience } from '../types';
import { useTheme, useFavorites } from '../hooks';
import { formatDate, formatRating } from '../utils';
import { BORDER_RADIUS, FONT_SIZE, SPACING } from '../utils/theme';

interface ExperienceCardProps {
  experience: Experience;
  onPress: (id: string) => void;
  variant?: 'default' | 'compact';
}

const CARD_WIDTH = Dimensions.get('window').width - SPACING.lg * 2;

const ExperienceCardComponent: React.FC<ExperienceCardProps> = ({
  experience,
  onPress,
  variant = 'default',
}) => {
  const { colors } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites(experience.id);

  const handleCardPress = useCallback(() => {
    onPress(experience.id);
  }, [onPress, experience.id]);

  const handleFavoritePress = useCallback(() => {
    toggleFavorite(experience.id);
  }, [toggleFavorite, experience.id]);

  const cardWidth = useMemo(
    () => (variant === 'compact' ? CARD_WIDTH * 0.75 : CARD_WIDTH),
    [variant]
  );

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          shadowColor: colors.shadow,
          width: cardWidth,
        },
      ]}
      onPress={handleCardPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: experience.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <TouchableOpacity
          style={[styles.favoriteButton, { backgroundColor: colors.surface }]}
          onPress={handleFavoritePress}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          activeOpacity={0.8}
        >
          <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>

        <View style={[styles.ratingBadge, { backgroundColor: colors.surface }]}>
          <Text style={[styles.ratingText, { color: colors.text }]}>
            ⭐ {formatRating(experience.rating)}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {experience.title}
        </Text>

        <View style={styles.metaRow}>
          <Text style={[styles.meta, { color: colors.textSecondary }]} numberOfLines={1}>
            📍 {experience.location}
          </Text>
        </View>

        <Text style={[styles.date, { color: colors.primary }]}>
          📅 {formatDate(experience.date)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const ExperienceCard = memo(ExperienceCardComponent);

const styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    fontSize: FONT_SIZE.md,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: SPACING.md,
    left: SPACING.md,
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  ratingText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '600',
  },
  content: {
    padding: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    marginBottom: SPACING.sm,
    lineHeight: 24,
  },
  metaRow: {
    marginBottom: SPACING.xs,
  },
  meta: {
    fontSize: FONT_SIZE.sm,
  },
  date: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
  },
});