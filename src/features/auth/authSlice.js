import { createSlice } from '@reduxjs/toolkit';

const initialUser = JSON.parse(localStorage.getItem('currentUser')) || null;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: initialUser,
  },
  reducers: {
    login(state, action) {
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
    logout(state) {
      state.currentUser = null;
      localStorage.removeItem('currentUser');
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
