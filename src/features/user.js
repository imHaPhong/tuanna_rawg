import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  userName: "",
  isLogin: false,
};

const useSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.userName = action.payload.userName;
      state.isLogin = action.payload.isLogin;
    },
  },
});
const { reducer, actions } = useSlice;
export const { getUser } = actions;
export default reducer;
