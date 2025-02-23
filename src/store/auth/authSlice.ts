import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  currentUser: any;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  currentUser: {},
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    loginFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = {};
      state.isLoggedIn = false;
    },
    oauth2Start: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    oauth2Complete: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailed, logout } =
  authSlice.actions;
export default authSlice.reducer;
