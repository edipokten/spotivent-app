import { View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MainScreen({ route, navigation }) {
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("token", "test");
    } catch (e) {
      // saving error
    }
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      console.log(value);
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };
  return (
    <View>
      <Button
        onPress={() => {
          storeData("okten");
        }}
        title="save"
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
      <Button
        onPress={() => {
          getData();
        }}
        title="get"
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
