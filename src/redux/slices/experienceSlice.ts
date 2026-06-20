import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryId, Experience } from '../../types';

interface ExperienceState {
  items: Experience[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: CategoryId;
}

const initialState: ExperienceState = {
  items: [],
  loading: false,
  error: null,
  searchQuery: '',
  selectedCategory: 'all',
};

const experienceSlice = createSlice({
  name: 'experiences',
  initialState,
  reducers: {
    fetchExperiencesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchExperiencesSuccess: (state, action: PayloadAction<Experience[]>) => {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    },
    fetchExperiencesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<CategoryId>) => {
      state.selectedCategory = action.payload;
    },
    clearFilters: (state) => {
      state.searchQuery = '';
      state.selectedCategory = 'all';
    },
  },
});

export const {
  fetchExperiencesStart,
  fetchExperiencesSuccess,
  fetchExperiencesFailure,
  setSearchQuery,
  setSelectedCategory,
  clearFilters,
} = experienceSlice.actions;

export default experienceSlice.reducer;
