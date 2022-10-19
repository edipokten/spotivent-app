import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user/slice";
import playlistReducer from "./playlist/slice";
import appStateReducer from "./appState/slice";
import eventReducer from "./event/slice";

export default configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
    playlist: playlistReducer,
    event: eventReducer,
  },
});
