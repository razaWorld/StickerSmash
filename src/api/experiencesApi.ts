import axios, { AxiosInstance } from 'axios';
import { MOCK_EXPERIENCES, MOCK_USER } from './mockData';
import { Experience, User } from '../types';

const SIMULATED_DELAY_MS = 800;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://api.local-experiences.mock/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export const fetchExperiences = async (): Promise<Experience[]> => {
  await delay(SIMULATED_DELAY_MS);
  const response = await apiClient.get<Experience[]>('/experiences').catch(() => null);
  if (response?.data) return response.data;
  return MOCK_EXPERIENCES;
};

export const fetchExperienceById = async (id: string): Promise<Experience> => {
  await delay(SIMULATED_DELAY_MS / 2);
  const experience = MOCK_EXPERIENCES.find((exp) => exp.id === id);
  if (!experience) {
    throw new Error('Experience not found');
  }
  return experience;
};

export const fetchUserProfile = async (): Promise<User> => {
  await delay(SIMULATED_DELAY_MS);
  const response = await apiClient.get<User>('/user/profile').catch(() => null);
  if (response?.data) return response.data;
  return MOCK_USER;
};

export { apiClient };
