import * as userService from '../../services/userService';
import { add } from './userSlice';

export const fetchUserInfoAction = () => async (dispatch: any) => {
  try {
    const data = await userService.getUserInfo();
    if (data) {
      dispatch(
        add({
          username: data.username,
          fullName: data.fullName,
          email: data.email,
        }),
      );
    }
  } catch (error) {
    console.error('Failed to fetch user info:', error);
  }
};
