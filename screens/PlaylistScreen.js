import { Text, View, Image, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
export default function PlaylistScreen({ route, navigation }) {
  const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 200,
      height: 200,
    },
    logo: {
      width: 66,
      height: 58,
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
      <Image
        style={styles.tinyLogo}
        source={require("../assets/icon-green.png")}
      />
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
        onPress={() => navigation.navigate("Playlist")}
        title="Login"
        loading={false}
        loadingProps={{ size: "small", color: "white" }}
        buttonStyle={{
          backgroundColor: "#1DB954",
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
