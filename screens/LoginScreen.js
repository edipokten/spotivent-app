import { Text, View, Image, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/user/thunks";
import { selectToken, selectProfile } from "../store/user/selectors";
import { useEffect } from "react";

export default function LoginScreen({ route, navigation }) {
  const dispatch = useDispatch();

  //const token = useSelector(selectToken);

  const loginRequest = async () => {
    try {
      dispatch(login());
    } catch (e) {
      console.log(e.message);
    }
  };
  // Passing configuration object to axios

  const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    logo: {
      width: 200,
      height: 200,
    },
  });
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#191414",
        flex: 1,
      }}
    >
      <Text
        style={{
          fontSize: 50,
          textAlign: "center",
          color: "white",
        }}
      >
        Spotivent
      </Text>
      <Image style={styles.logo} source={require("../assets/icon-green.png")} />
      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
          color: "white",
        }}
      >
        Electronic events around you for your music taste
      </Text>

      <Button
        onPress={() => {
          loginRequest();
        }}
        title="Login"
        loading={false}
        loadingProps={{ size: "small", color: "white" }}
        buttonStyle={{
          backgroundColor: "#23D662",
          borderRadius: 5,
        }}
        titleStyle={{ fontWeight: "bold", color: "black", fontSize: 23 }}
        containerStyle={{
          marginHorizontal: 50,
          height: 50,
          width: 350,
          marginVertical: 10,
        }}
        icon={{
          name: "spotify",
          type: "font-awesome",
          size: 30,
          color: "black",
        }}
      >
        Login with Spotify
      </Button>
    </View>
  );
}
