import { useMemo } from 'react';
import { useAppSelector } from '../redux';
import { useGetExperiencesQuery } from '../redux';
import { filterExperiences } from '../utils';
import { Experience } from '../types';

export const useFilteredExperiences = (): {
  experiences: Experience[];
  loading: boolean;
  error: string | null;
} => {
  const { data, isLoading, error } = useGetExperiencesQuery();
  const searchQuery = useAppSelector((state) => state.experiences.searchQuery);
  const selectedCategory = useAppSelector((state) => state.experiences.selectedCategory);

  const experiences = useMemo(
    () => filterExperiences(data ?? [], searchQuery, selectedCategory),
    [data, searchQuery, selectedCategory]
  );

  return {
    experiences,
    loading: isLoading,
    error: error ? String(error) : null,
  };
};
