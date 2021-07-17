import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import clientApi from "../../api/config";

export const getGameData = createAsyncThunk(
  "user/getGame",
  async ({ params }) => {
    const gameData = await clientApi.get("/games", {
      params,
    });
    return {
      games: gameData.results,
      nextUrl: gameData.next,
    };
  }
);

export const nextPage = createAsyncThunk("user/nextPage", async (params) => {
  const gameData = await clientApi.get(params.nextUrl);
  return {
    games: gameData.results,
    nextUrl: gameData.next,
  };
});

const initialState = {};

const GameSlice = createSlice({
  name: "gameSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getGameData.pending]: (state, actions) => {
      state[`GENER_COLLECTION_TYPE|${actions.meta.arg.slug}`] = {
        loading: true,
        games: [],
        nextUrl: "",
      };
    },
    [getGameData.fulfilled]: (state, actions) => {
      const game = state[`GENER_COLLECTION_TYPE|${actions.meta.arg.slug}`];
      state[`GENER_COLLECTION_TYPE|${actions.meta.arg.slug}`] = {
        loading: false,
        games: actions.payload.games,
        nextUrl: actions.payload.nextUrl,
      };
    },
    [nextPage.pending]: (state, actions) => {
      state[`GENER_COLLECTION_TYPE|${actions.meta.arg.slug}`] = {
        loading: true,
        games: state[`GENER_COLLECTION_TYPE|${actions.meta.arg.slug}`].games,
        nextUrl: "",
      };
    },
    [nextPage.rejected]: (state, actions) => {},
    [nextPage.fulfilled]: (state, actions) => {
      state[`GENER_COLLECTION_TYPE|${actions.meta.arg.slug}`] = {
        loading: false,
        games: state[
          `GENER_COLLECTION_TYPE|${actions.meta.arg.slug}`
        ].games.concat(actions.payload.games),
        nextUrl: actions.payload.nextUrl,
      };
    },
  },
});

const { reducer, actions } = GameSlice;
export const {} = actions;
export default reducer;
