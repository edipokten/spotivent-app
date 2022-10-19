import { apiUrl } from "../../config/constants";
import axios from "axios";
import { Linking } from "react-native";
import { loginSuccess } from "./slice";
import { URL, URLSearchParams } from "react-native-url-polyfill";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";
import { playlistImported } from "./slice";

// function getURLParams(parameterName, url) {
//   let name = parameterName.replace(/[\[\]]/g, "\\$&");
//   let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
//     results = regex.exec(url);
//   if (!results) return null;
//   if (!results[2]) return null;
//   return decodeURIComponent(results[2].replace(/\+/g, " "));
// }
export const login = () => {
  return async (dispatch, getState) => {
    dispatch(appLoading());

    try {
      const redirect = await Linking.getInitialURL("/");
      const response = await axios.get(
        `${apiUrl}/api/login?redirect=${redirect}`
      );

      Linking.openURL(response.data);

      Linking.addEventListener("url", async (url_) => {
        const url = new URL(url_.url);
        const urlParams = new URLSearchParams(url.search);
        const token = urlParams.get("token");
        console.log(token);

        const response = await axios.get(`${apiUrl}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = response.data;

        const profile = {
          spotifyUserId: user.spotifyUserId,
          image: user.image,
          name: user.name,
          importedPlaylists: user.importedPlaylists,
        };
        if (user.importedPlaylists.length > 0) {
          dispatch(playlistImported());
        }

        await AsyncStorage.setItem("token", token);

        dispatch(loginSuccess({ token, profile }));
        dispatch(appDoneLoading());
      });
    } catch (error) {
      await AsyncStorage.removeItem("token").then(() => {
        dispatch(appDoneLoading());
      });

      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
};

export const getUserWithToken = () => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("takirrr", token);
      if (token) {
        const response = await axios.get(`${apiUrl}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = response.data;

        const profile = {
          spotifyUserId: user.spotifyUserId,
          image: user.image,
          name: user.name,
          importedPlaylists: user.importedPlaylists,
        };
        if (user.importedPlaylists.length > 0) {
          dispatch(playlistImported());
        }

        dispatch(loginSuccess({ token, profile }));
      }
      dispatch(appDoneLoading());
    } catch (error) {
      await AsyncStorage.removeItem("token").then(() => {
        dispatch(appDoneLoading());
      });
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
};
