import { apiUrl } from "../../config/constants";
import axios from "axios";
import { setPlaylists } from "./slice";
import { selectToken } from "../user/selectors";
import { playlistImported } from "../user/slice";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";

export const getPlaylists = () => {
  return async (dispatch, getState) => {
    try {
      const token = selectToken(getState());
      const response = await axios.get(`${apiUrl}/user/playlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(setPlaylists(response.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
};
export const setSelectedPlaylists = (playlists) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const token = selectToken(getState());
      console.log(token);
      const response = await axios.post(
        `${apiUrl}/user/playlist`,
        {
          playlists: playlists,
        },

        {
          "content-type": "text/json",

          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status == 200) {
        dispatch(playlistImported());
      }
      dispatch(appDoneLoading());

      console.log(response.status);
    } catch (error) {
      dispatch(appDoneLoading());

      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
};
