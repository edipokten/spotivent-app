import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import PlaylistScreen from "./screens/PlaylistScreen";
import MainScreen from "./screens/MainScreen";
import SplashScreen from "./screens/SplashScreen";
import { selectAppLoading } from "./store/appState/selectors";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { appLoading, appDoneLoading } from "./store/appState/selectors";

import store from "./store";
import { Provider } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProfile,
  selectToken,
  selectIsPlaylistImported,
} from "./store/user/selectors";
import { getUserWithToken } from "./store/user/thunks";

const Stack = createStackNavigator();

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

function App() {
  const token = useSelector(selectToken);
  const profile = useSelector(selectProfile);
  const appLoading = useSelector(selectAppLoading);
  const isPlaylistImported = useSelector(selectIsPlaylistImported);

  const dispatch = useDispatch();

  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isSelectedPlaylists, setisSelectedPlaylists] = useState(false);

  useEffect(() => {
    //  const value = await AsyncStorage.getItem("token");
    //await AsyncStorage.removeItem("token");
    dispatch(getUserWithToken());
  }, []);

  // useEffect(() => {
  //   if (token) {
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, [isLoggedIn, profile]);

  return (
    // <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#1DB954",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      >
        {appLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : isPlaylistImported ? (
          <Stack.Screen name="Main" component={MainScreen} />
        ) : profile && !isPlaylistImported ? (
          <Stack.Screen name="Playlist" component={PlaylistScreen} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
    // </Provider>
  );
}

export default AppWrapper;
