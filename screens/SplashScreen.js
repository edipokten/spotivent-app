import { View, StyleSheet, Image, Text } from "react-native";
export default function SplashScreen({ route, navigation }) {
  const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    logo: {
      width: 100,
      height: 100,
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
      <View alignItems="center">
        <Image style={styles.logo} source={require("../assets/spinner.gif")} />

        <Text
          style={{
            alignSelf: "center",
            fontSize: 50,
            textAlign: "center",
            color: "#23D662",
          }}
        >
          Loading...
        </Text>
      </View>
    </View>
  );
}
