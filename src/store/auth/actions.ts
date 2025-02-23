import { login, getCsrfToken } from '../../services/authService';
import { getUserInfo } from '../../services/userService';
import {
  loginStart,
  loginSuccess,
  loginFailed,
  logout,
} from '../auth/authSlice';
import { AppDispatch } from '../store';

export const loginUser =
  (credentials: Record<string, any>) => async (dispatch: any) => {
    try {
      dispatch(loginStart());
      await getCsrfToken(); // Fetch CSRF token if needed
      const response = await login(credentials);
      dispatch(loginSuccess(response.data));
      fetchUserInfo(dispatch);
    } catch (error) {
      dispatch(loginFailed(error.message));
    }
  };

export const fetchUserInfo = async (dispatch: any) => {
  try {
    const user = await getUserInfo();
    dispatch(loginSuccess(user)); // Update auth state with user info
  } catch (error) {
    dispatch(loginFailed('Failed to fetch user info' + error));
  }
};

export const logoutUser = () => (dispatch: any) => {
  // Add logout API call if needed
  dispatch(logout());
};

// Add this to your existing authActions.ts
export const oauth2Login = async (dispatch: AppDispatch) => {
  try {
    dispatch(loginStart()); // Optional: Show loading state
    await getCsrfToken(); // If needed for CSRF protection
    window.location.href = `http://localhost:8080/oauth2/authorization/github`;
  } catch (error) {
    dispatch(loginFailed(error.message));
  }
};
