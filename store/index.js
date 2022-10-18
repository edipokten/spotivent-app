import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user/slice";
import playlistReducer from "./playlist/slice";
import appStateReducer from "./appState/slice";

export default configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
    playlist: playlistReducer,
  },
});
