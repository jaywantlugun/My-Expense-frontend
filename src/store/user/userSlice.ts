import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  fullName: string;
  email: string;
}

const initialState: UserState = {
  username: '',
  fullName: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<UserState>) => {
      console.log('add reducer called');
      state.username = action.payload.username;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
    },
  },
});

export const { add } = userSlice.actions;
export default userSlice.reducer;
