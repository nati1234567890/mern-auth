import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { signInFail, signInStart, signInSuccess } = UserSlice.actions;
export default UserSlice.reducer;
