import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Experience } from '../../types';

interface FavoritesState {
  favoriteIds: string[];
}

const initialState: FavoritesState = {
  favoriteIds: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.favoriteIds.indexOf(id);
      if (index >= 0) {
        state.favoriteIds.splice(index, 1);
      } else {
        state.favoriteIds.push(id);
      }
    },
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.favoriteIds = action.payload;
    },
  },
});

export const { toggleFavorite, setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;

export const selectFavoriteIds = (state: { favorites: FavoritesState }) =>
  state.favorites.favoriteIds;

export const selectIsFavorite = (id: string) => (state: { favorites: FavoritesState }) =>
  state.favorites.favoriteIds.includes(id);

export const selectFavoriteExperiences =
  (experiences: Experience[]) =>
  (state: { favorites: FavoritesState }) =>
    experiences.filter((exp) => state.favorites.favoriteIds.includes(exp.id));
