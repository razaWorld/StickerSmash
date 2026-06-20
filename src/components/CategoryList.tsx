import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { CATEGORIES } from '../api';
import { CategoryId } from '../types';
import { useTheme } from '../hooks';
import { BORDER_RADIUS, FONT_SIZE, SPACING } from '../utils/theme';

interface CategoryListProps {
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const { colors } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {CATEGORIES.filter((cat) => cat.id !== 'all').map((category) => {
        const isSelected = selectedCategory === category.id;
        return (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.chip,
              {
                backgroundColor: isSelected
                  ? colors.categoryActive
                  : colors.categoryInactive,
              },
            ]}
            onPress={() => onSelectCategory(category.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.icon}>{category.icon}</Text>
            <Text
              style={[
                styles.label,
                { color: isSelected ? '#FFFFFF' : colors.text },
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        style={[
          styles.chip,
          {
            backgroundColor:
              selectedCategory === 'all'
                ? colors.categoryActive
                : colors.categoryInactive,
          },
        ]}
        onPress={() => onSelectCategory('all')}
        activeOpacity={0.8}
      >
        <Text style={styles.icon}>✨</Text>
        <Text
          style={[
            styles.label,
            { color: selectedCategory === 'all' ? '#FFFFFF' : colors.text },
          ]}
        >
          All
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 2,
    borderRadius: BORDER_RADIUS.full,
    marginRight: SPACING.sm,
  },
  icon: {
    fontSize: FONT_SIZE.sm,
    marginRight: SPACING.xs,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
  },
});
