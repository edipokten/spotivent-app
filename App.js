import React, { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import PlaylistScreen from "./screens/PlaylistScreen";
import MainScreen from "./screens/MainScreen";
import SplashScreen from "./screens/SplashScreen";
import { selectAppLoading } from "./store/appState/selectors";

import store from "./store";
import { Provider } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProfile,
  selectToken,
  selectIsPlaylistImported,
} from "./store/user/selectors";
import { getUserWithToken } from "./store/user/thunks";
import { Button, Icon } from "@rneui/base";
import { View, Image, Text } from "react-native";
import { logOut } from "./store/user/slice";

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

  useEffect(() => {
    dispatch(getUserWithToken());
  }, []);

  function LogoTitle() {
    return (
      <View
        style={{
          justifyContent: "space-evenly",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 50, height: 50 }}
          source={require("./assets/icon-green.png")}
        />
        <Text style={{ fontSize: 24 }}>Spotivent</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#1DB954",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {appLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : isPlaylistImported ? (
          <Stack.Screen
            name="Main"
            options={{
              headerTitle: () => <LogoTitle />,
              title: "Spotivent",
              headerRight: () => (
                <Button
                  type="clear"
                  icon={
                    <Icon
                      name="log-out-outline"
                      type="ionicon"
                      color="black"
                      size={30}
                    />
                  }
                  onPress={() => {
                    dispatch(logOut());
                  }}
                  iconRight
                />
              ),
            }}
            component={MainScreen}
          />
        ) : profile && !isPlaylistImported ? (
          <Stack.Screen name="Playlist" component={PlaylistScreen} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppWrapper;
