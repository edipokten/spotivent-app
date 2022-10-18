import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playlists: [],
};

export const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setPlaylists: (state, action) => {
      state.playlists = [...action.payload];
    },
  },
});

export const { setPlaylists } = playlistSlice.actions;

export default playlistSlice.reducer;
