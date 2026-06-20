import { fetchExperiences, fetchExperienceById, fetchUserProfile } from '../api';
import { AppDispatch } from '../redux/store';
import {
  fetchExperiencesStart,
  fetchExperiencesSuccess,
  fetchExperiencesFailure,
} from '../redux/slices/experienceSlice';
import {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
} from '../redux/slices/userSlice';

export const loadExperiences = () => async (dispatch: AppDispatch) => {
  dispatch(fetchExperiencesStart());
  try {
    const data = await fetchExperiences();
    dispatch(fetchExperiencesSuccess(data));
  } catch (error) {
    dispatch(
      fetchExperiencesFailure(
        error instanceof Error ? error.message : 'Failed to load experiences'
      )
    );
  }
};

export const loadUserProfile = () => async (dispatch: AppDispatch) => {
  dispatch(fetchUserStart());
  try {
    const data = await fetchUserProfile();
    dispatch(fetchUserSuccess(data));
  } catch (error) {
    dispatch(
      fetchUserFailure(
        error instanceof Error ? error.message : 'Failed to load profile'
      )
    );
  }
};

export { fetchExperienceById };
