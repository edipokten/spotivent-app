import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  profile: null,
  isPlaylistImported: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.profile = action.payload.profile;
      console.log("imported?", action.payload.profile.importedPlaylists);
      state.isPlaylistImported =
        action.payload.profile.importedPlaylists.length > 0 ? true : false;
      console.log("state", state.isPlaylistImported);
    },
    logOut: (state, action) => {
      state.token = null;
      state.profile = null;
      state.isPlaylistImported = false;
    },
    playlistImported: (state, action) => {
      state.isPlaylistImported = true;
    },
  },
});

export const { loginSuccess, logOut, playlistImported } = userSlice.actions;

export default userSlice.reducer;
