import { useDispatch, useSelector } from "react-redux";
import { selectEvents } from "../store/event/selectors";
import { getEvents } from "../store/event/thunks";
import { Text, Card, Button, Icon } from "@rneui/themed";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { useEffect } from "react";
import moment from "moment";
import { Chip } from "react-native-paper";
//import Icon from 'react-native-vector-icons/FontAwesome5';

export default function MainScreen({ route, navigation }) {
  const dispatch = useDispatch();

  const events = useSelector(selectEvents);
  useEffect(() => {
    // console.log(events);
    if (events.length == 0) {
      dispatch(getEvents("2022-10-08 23:00:00+00", "2022-11-20 23:00:00+00"));
    } else {
      //  console.log(events);
    }
  }, [events]);
  return (
    <>
      <ScrollView style={{ backgroundColor: "#191414" }}>
        <View
          style={{
            alignItems: "stretch",
            justifyContent: "space-evenly",
            marginHorizontal: 15,
          }}
        >
          {events.map((event) => {
            return (
              <View>
                <View>
                  <Text style={styles.date}>
                    {moment(event.date).format("MMM Do YY")}
                  </Text>
                  <View style={styles.dateBottomLine} />
                </View>

                <Card containerStyle={styles.card}>
                  <Card.Title style={styles.title}>{event.name}</Card.Title>
                  <Card.Image
                    style={styles.image}
                    source={{
                      uri:
                        event.imageUrl == "yok"
                          ? "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/No_image_available_600_x_450.svg/1200px-No_image_available_600_x_450.svg.png?20150903195108"
                          : event.imageUrl,
                    }}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 15,
                    }}
                  >
                    <Text style={styles.artistTitle}>Artists</Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={styles.matchedArtist}>
                        2 matched artists
                      </Text>
                      <Icon
                        name="headset"
                        type="ionicon"
                        color="#23D662"
                        size={30}
                      />
                    </View>
                  </View>

                  <View style={styles.artistContainer}>
                    {!event.artists
                      ? ""
                      : event.artists.map((artist) => {
                          return (
                            <Chip
                              textStyle={styles.artistContainer.textStyle}
                              style={styles.artistContainer.chipStyle}
                              color="white"
                              mode={"outlined"}
                              containerStyle={
                                styles.artistContainer.chipCotainerStyle
                              }
                            >
                              {artist.name}
                            </Chip>
                          );
                        })}
                  </View>

                  <View>
                    {!event.artists ? (
                      ""
                    ) : (
                      <View>
                        <Text style={styles.artistTitle}>Genres</Text>
                        <View style={styles.artistContainer}>
                          {event.artists.map((artist) => {
                            return artist.genres.map((genre) => {
                              return (
                                <Chip
                                  textStyle={styles.artistContainer.textStyle}
                                  style={styles.artistContainer.chipStyle}
                                  color="white"
                                  mode={"outlined"}
                                  containerStyle={
                                    styles.artistContainer.chipCotainerStyle
                                  }
                                >
                                  {genre.name}
                                </Chip>
                              );
                            });
                          })}
                        </View>
                      </View>
                    )}
                  </View>
                </Card>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  card: {
    borderColor: "#191414",
    backgroundColor: "#191414",
  },
  date: {
    color: "white",
    fontSize: "25px",
  },
  dateBottomLine: {
    borderBottomColor: "#23D662",
    borderBottomWidth: "3px",
  },
  title: {
    color: "white",
    fontSize: "20px",
    textAlign: "left",
  },
  artistTitle: { color: "white", fontSize: "20" },
  divider: { marginTop: 10 },
  image: {
    padding: 0,
  },
  matchedArtist: {
    color: "white",
    fontSize: "14px",
  },
  artistContainer: {
    // alignContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",

    textStyle: {
      color: "white",
    },
    chipStyle: {
      backgroundColor: "#191414",
      borderColor: "#23D662",
      borderWidth: 1,
      marginVertical: 5,

      marginRight: 5,

      color: "white",
    },
  },
});
// <View
// style={{
//   flexDirection: "row",
//   justifyContent: "space-around",
// }}
// >
// <View style={{ backgroundColor: "blue" }}>
//   <Text>{event.name}</Text>
// </View>
// <View style={{ backgroundColor: "red" }}>
//   <Text>{event.location}</Text>

//   <Icon
//     name="location-outline"
//     type="ionicon"
//     color="#23D662"
//     onPress={() => console.log("hello")}
//   />
// </View>
// </View>

// <View>
//   <Button
//     onPress={() => {
//       dispatch(
//         getEvents("2022-10-08 23:00:00+00", "2022-12-18 23:00:00+00")
//       );
//     }}
//     title="save"
//     loading={false}
//     loadingProps={{ size: "small", color: "white" }}
//     buttonStyle={{
//       backgroundColor: "#23D662",
//       borderRadius: 5,
//     }}
//     titleStyle={{ fontWeight: "bold", color: "black", fontSize: 23 }}
//     containerStyle={{
//       marginHorizontal: 50,
//       height: 50,
//       width: 350,
//       marginVertical: 10,
//     }}
//     icon={{
//       name: "spotify",
//       type: "font-awesome",
//       size: 30,
//       color: "black",
//     }}
//   >
//     Login with Spotify
//   </Button>
// </View>
