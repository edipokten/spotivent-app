import { useDispatch, useSelector } from "react-redux";
import { selectEvents, selectEventsByArgument } from "../store/event/selectors";
import { getEvents } from "../store/event/thunks";
import { Text, Card, Button, Icon } from "@rneui/themed";
import { View, ScrollView, StyleSheet, Switch } from "react-native";
import { useEffect } from "react";
import moment from "moment";
import { Chip } from "react-native-paper";
//import Icon from 'react-native-vector-icons/FontAwesome5';
import { Linking } from "react-native";
import { useState } from "react";

export default function MainScreen({ route, navigation }) {
  const dispatch = useDispatch();

  const [isSelectedMutualArtist, setIsSelectedMutualArtist] = useState(false);
  const [mutualGenres, setMutualGenres] = useState(0);

  const events = useSelector((state) =>
    selectEventsByArgument(state, {
      mutualGenres: mutualGenres,
      mutualArtists: isSelectedMutualArtist,
    })
  );
  const plusValueMatchedGenres = () => {
    setMutualGenres(mutualGenres + 1);
  };
  const minusValueMatchedGenres = () => {
    if (mutualGenres !== 0) {
      setMutualGenres(mutualGenres - 1);
    }
  };

  const toggleIsSelectedMutualArtist = () => {
    setIsSelectedMutualArtist(!isSelectedMutualArtist);
  };
  useEffect(() => {
    // console.log(events);
    if (events.length == 0) {
      dispatch(getEvents("2022-10-08 23:00:00+00", "2022-11-25 23:00:00+00"));
    } else {
      //  console.log(events);
    }
  }, [events]);
  return (
    //   <View flexDirection="row">
    //   <View style={{ flexDirection: "row" }}>
    //     <Button
    //       style={{ width: 50, height: 50 }}
    //       buttonStyle={{
    //         backgroundColor: "#191414",
    //       }}
    //     >
    //       <Icon
    //         name="add-circle-outline"
    //         type="ionicon"
    //         color="#23D662"
    //         size={30}
    //       />
    //     </Button>
    //     <Text style={styles.text}>0</Text>
    //     <Button
    //       style={{ width: 50, height: 50 }}
    //       buttonStyle={{
    //         backgroundColor: "#191414",
    //       }}
    //     >
    //       <Icon
    //         name="add-circle-outline"
    //         type="ionicon"
    //         color="#23D662"
    //         size={30}
    //       />
    //     </Button>
    //   </View>
    // </View>

    <>
      <View>
        <View
          style={{
            // justifyContent: "space-evenly",
            // flexDirection: "row",
            // alignItems: "center",
            backgroundColor: "#191414",
          }}
        >
          <View
            style={{
              paddingTop: 10,
              justifyContent: "space-evenly",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>Matched Artists</Text>
            <Text style={styles.text}>Matched Genres</Text>
          </View>

          <View
            style={{
              justifyContent: "space-around",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ paddingLeft: 20 }}>
              <Switch
                trackColor={{ false: "#767577", true: "#23D662" }}
                thumbColor={"white"}
                ios_backgroundColor="#3e3e3e"
                backgroundColor="3e3e3e"
                onValueChange={toggleIsSelectedMutualArtist}
                value={isSelectedMutualArtist}
              ></Switch>
            </View>

            <View>
              <View
                style={{
                  display: "flex",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",

                    alignItems: "center",

                    justifyContent: "center",
                    paddingRight: 10,
                  }}
                >
                  <Button
                    onPress={minusValueMatchedGenres}
                    style={{ width: 50, height: 50 }}
                    buttonStyle={{
                      backgroundColor: "#191414",
                    }}
                  >
                    <Icon
                      name="remove-circle-outline"
                      type="ionicon"
                      color="#23D662"
                      size={30}
                    />
                  </Button>
                  <Text style={styles.text}>{mutualGenres}</Text>
                  <Button
                    onPress={plusValueMatchedGenres}
                    style={{ width: 50, height: 50 }}
                    buttonStyle={{
                      backgroundColor: "#191414",
                    }}
                  >
                    <Icon
                      name="add-circle-outline"
                      type="ionicon"
                      color="#23D662"
                      size={30}
                    />
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </View>
        <ScrollView style={{ backgroundColor: "#191414" }}>
          <View
            style={{
              alignItems: "stretch",
              justifyContent: "space-evenly",
              marginHorizontal: 15,
            }}
          >
            {events.map((event) => {
              console.log("all mutual artists", event.mutualArtists);
              return (
                <View key={event.id}>
                  <View>
                    <Text style={styles.date}>
                      {moment(event.date).format("MMM Do YY")}
                    </Text>

                    <View style={styles.dateBottomLine} />
                  </View>

                  <Card containerStyle={styles.card}>
                    <Card.Title style={styles.title}>{event.name} </Card.Title>
                    <View
                      style={{
                        justifyContent: "flex-end",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.text}>{event.location}</Text>
                      <Icon
                        name="location"
                        type="ionicon"
                        color="#23D662"
                        size={30}
                      />
                    </View>
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
                      {console.log(
                        "my mutual artists length:",
                        event.mutualArtists.length
                      )}

                      {event.mutualArtists.length > 0 ? (
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text style={styles.matchedArtist}>
                            {event.mutualArtists.length === 1
                              ? `${event.mutualArtists.length} matched artist`
                              : `${event.mutualArtists.length} matched artists`}
                          </Text>
                          <Icon
                            name="headset"
                            type="ionicon"
                            color="#23D662"
                            size={30}
                          />
                        </View>
                      ) : (
                        ""
                      )}
                    </View>

                    <View style={styles.artistContainer}>
                      {!event.artists
                        ? ""
                        : event.artists.map((artist) => {
                            if (
                              event.mutualArtists.filter(
                                (e) => e.name === artist.name
                              ).length > 0
                            ) {
                              return (
                                <Chip
                                  key={artist.id}
                                  textStyle={
                                    styles.artistContainer.textStyleMutual
                                  }
                                  style={styles.artistContainer.chipStyleMutual}
                                  containerStyle={
                                    styles.artistContainer
                                      .chipCotainerStyleMutual
                                  }
                                >
                                  {artist.name}
                                </Chip>
                              );
                            } else {
                              return (
                                <Chip
                                  key={artist.id}
                                  textStyle={styles.artistContainer.textStyle}
                                  style={styles.artistContainer.chipStyle}
                                  containerStyle={
                                    styles.artistContainer.chipCotainerStyle
                                  }
                                >
                                  {artist.name}
                                </Chip>
                              );
                            }
                          })}
                    </View>

                    <View>
                      {!event.artists ? (
                        ""
                      ) : (
                        <View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginTop: 15,
                            }}
                          >
                            <Text style={styles.artistTitle}>Genre</Text>

                            {event.mutualGenres.length > 0 ? (
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <Text style={styles.matchedArtist}>
                                  {event.mutualGenres.length === 1
                                    ? `${event.mutualGenres.length} matched genre`
                                    : `${event.mutualGenres.length} matched genres`}
                                </Text>
                                <Icon
                                  name="musical-notes"
                                  type="ionicon"
                                  color="#23D662"
                                  size={30}
                                />
                              </View>
                            ) : (
                              ""
                            )}
                          </View>

                          <View style={styles.artistContainer}>
                            {event.artists.map((artist) => {
                              return artist.genres.map((genre, i) => {
                                if (event.mutualGenres.includes(genre.name)) {
                                  return (
                                    <Chip
                                      key={i}
                                      textStyle={
                                        styles.artistContainer.textStyleMutual
                                      }
                                      style={
                                        styles.artistContainer.chipStyleMutual
                                      }
                                      containerStyle={
                                        styles.artistContainer
                                          .chipCotainerStyleMutual
                                      }
                                    >
                                      {genre.name}
                                    </Chip>
                                  );
                                } else {
                                  return (
                                    <Chip
                                      key={i}
                                      textStyle={
                                        styles.artistContainer.textStyle
                                      }
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
                                }
                              });
                            })}
                          </View>
                        </View>
                      )}
                    </View>

                    <Card.Divider style={styles.divider} />
                    <Button
                      onPress={() => {
                        Linking.openURL(event.eventUrl);
                      }}
                      title="Login"
                      loading={false}
                      loadingProps={{ size: "small", color: "white" }}
                      buttonStyle={{
                        backgroundColor: "#23D662",
                        borderRadius: 5,
                      }}
                      titleStyle={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: 16,
                      }}
                      containerStyle={{
                        height: 40,
                      }}
                    >
                      Go to Page
                    </Button>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 15,
                      }}
                    ></View>
                  </Card>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
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
    marginTop: 10,
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
    chipCotainerStyle: {
      backgroundColor: "#191414",
      borderColor: "#23D662",
      borderWidth: 1,
      marginVertical: 5,

      marginRight: 5,

      color: "white",
    },
    textStyleMutual: {
      color: "#191414",
    },
    chipStyleMutual: {
      backgroundColor: "#23D662",
      borderColor: "#23D662",
      borderWidth: 1,
      marginVertical: 5,

      marginRight: 5,

      color: "white",
    },
  },
  text: {
    color: "white",
    fontSize: "14px",
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
