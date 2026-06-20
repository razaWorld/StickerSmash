import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Experience, User } from '../../types';

interface UserState {
  profile: User | null;
  loading: boolean;
  error: string | null;
  themeMode: 'light' | 'dark';
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
  themeMode: 'light',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.profile = action.payload;
      state.error = null;
    },
    fetchUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    },
    joinExperience: (state, action: PayloadAction<Experience>) => {
      if (!state.profile) return;
      const alreadyJoined = state.profile.joinedExperiences.some(
        (exp) => exp.id === action.payload.id
      );
      if (!alreadyJoined) {
        state.profile.joinedExperiences.push(action.payload);
      }
    },
  },
});

export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  toggleTheme,
  joinExperience,
} = userSlice.actions;

export default userSlice.reducer;
