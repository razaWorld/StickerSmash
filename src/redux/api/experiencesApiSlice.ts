import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { fetchExperienceById, fetchExperiences, fetchUserProfile } from '../../api';
import { Experience, User } from '../../types';

export const experiencesApi = createApi({
  reducerPath: 'experiencesApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Experiences', 'Experience', 'User'],
  endpoints: (builder) => ({
    getExperiences: builder.query<Experience[], void>({
      queryFn: async () => {
        try {
          const data = await fetchExperiences();
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to fetch experiences',
            },
          };
        }
      },
      providesTags: ['Experiences'],
    }),
    getExperienceById: builder.query<Experience, string>({
      queryFn: async (id) => {
        try {
          const data = await fetchExperienceById(id);
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to fetch experience',
            },
          };
        }
      },
      providesTags: (_result, _error, id) => [{ type: 'Experience', id }],
    }),
    getUserProfile: builder.query<User, void>({
      queryFn: async () => {
        try {
          const data = await fetchUserProfile();
          return { data };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to fetch profile',
            },
          };
        }
      },
      providesTags: ['User'],
    }),
  }),
});

export const {
  useGetExperiencesQuery,
  useGetExperienceByIdQuery,
  useGetUserProfileQuery,
} = experiencesApi;
