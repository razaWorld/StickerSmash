import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { experiencesApi } from './api/experiencesApiSlice';
import experienceReducer from './slices/experienceSlice';
import favoritesReducer from './slices/favoritesSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    favorites: favoritesReducer,
    experiences: experienceReducer,
    [experiencesApi.reducerPath]: experiencesApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 4000,
      },
      immutableCheck: {
        warnAfter: 4000,
      },
    }).concat(experiencesApi.middleware),

  devTools: __DEV__,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector =
  useSelector.withTypes<RootState>();