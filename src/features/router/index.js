import { createSlice } from "@reduxjs/toolkit";
import queryString from "query-string";

const initialState = {
  path: "",
  query: "",
  option: "action",
};

const routerSlide = createSlice({
  name: "routerSlice",
  initialState,
  reducers: {
    changeRouter: (state, actions) => {
      state = {
        path: actions.payload.path,
        query: actions.payload.query,
        option: actions.payload.option || state.option,
      };
      return state;
    },
    changeOption: (state, actions) => {
      state.option = `?genres=${actions.payload}`;
    },
  },
});

const { reducer, actions } = routerSlide;
export const { changeRouter, changeOption } = actions;
export default reducer;
