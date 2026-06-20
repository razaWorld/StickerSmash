import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../redux';
import { toggleFavorite, selectIsFavorite } from '../redux';

export const useFavorites = (experienceId?: string) => {
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector((state) => state.favorites.favoriteIds);
  const isFavorite = useAppSelector(
    experienceId ? selectIsFavorite(experienceId) : () => false
  );

  const toggle = useCallback(
    (id: string) => {
      dispatch(toggleFavorite(id));
    },
    [dispatch]
  );

  return { favoriteIds, isFavorite, toggleFavorite: toggle };
};
