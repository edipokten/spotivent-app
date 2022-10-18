import { Text, View, Image, StyleSheet } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { selectProfile } from "../store/user/selectors";
import { selectPlaylists } from "../store/playlist/selectors";
import { getPlaylists } from "../store/playlist/thunks";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, ListItem } from "@rneui/themed";
import { FlatList } from "react-native-gesture-handler";
import React, { useState } from "react";
import { setSelectedPlaylists } from "../store/playlist/thunks";
export default function PlaylistScreen({ route, navigation }) {
  const dispatch = useDispatch();

  const playlists = useSelector(selectPlaylists);
  const profile = useSelector(selectProfile);
  const [checkedPlaylists, setCheckPlaylists] = useState([]);

  useEffect(() => {
    if (playlists.length == 0) {
      dispatch(getPlaylists());
    } else {
      console.log(playlists);
    }
    // if (playlists) {
    //   navigation.navigate("MainScreen");
    // }
  }, [playlists]);

  const handleCheck = (item) => {
    let updatedList = [...checkedPlaylists];
    if (!isChecked(item)) {
      updatedList = [...checkedPlaylists, item];
    } else {
      updatedList.splice(checkedPlaylists.indexOf(item), 1);
    }
    setCheckPlaylists(updatedList);
  };
  const isChecked = (item) => {
    return checkedPlaylists.includes(item);
  };
  const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },

    logo: {
      width: 200,
      height: 200,
    },
  });
  const goToMainScreen = () => {
    // console.log(checkedPlaylists);
    dispatch(setSelectedPlaylists(checkedPlaylists));
  };

  return (
    <View
      style={{
        backgroundColor: "#191414",
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 30,
          marginTop: 30,
        }}
      >
        <Avatar size={128} rounded source={{ uri: profile.image }} />
      </View>
      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
          color: "white",
        }}
      >
        Welcome {profile.name} please import your playlists
      </Text>
      <FlatList
        ListHeaderComponent={
          <>
            <View>
              {playlists.map((item, i) => (
                <ListItem
                  containerStyle={{ backgroundColor: "#191414" }}
                  key={i}
                  bottomDivider
                >
                  <ListItem.CheckBox
                    containerStyle={{ backgroundColor: "#191414" }}
                    backgroundColor={"black"}
                    center
                    value={item}
                    onPress={() => {
                      handleCheck(item);
                    }}
                    checked={isChecked(item)}
                    checkedIcon={
                      <Icon
                        name="checkbox"
                        type="ionicon"
                        color="#23D662"
                        size={30}
                        iconStyle={{ marginRight: 10 }}
                      />
                    }
                    uncheckedIcon={
                      <Icon
                        name="square-outline"
                        type="ionicon"
                        color="#23D662"
                        size={30}
                        iconStyle={{ marginRight: 10 }}
                      />
                    }
                  />
                  <ListItem.Content>
                    <ListItem.Title style={{ color: "white" }}>
                      {item.name}
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </View>
          </>
        }
      />

      <Button
        onPress={goToMainScreen}
        disabled={checkedPlaylists.length > 0 ? false : true}
        title="Login"
        loading={false}
        loadingProps={{ size: "small", color: "white" }}
        buttonStyle={{
          backgroundColor: "#23D662",
          borderRadius: 5,
        }}
        titleStyle={{ fontWeight: "bold", color: "black", fontSize: 23 }}
        containerStyle={{
          marginTop: 20,
          height: 50,
          width: 300,
          marginBottom: 20,
          marginHorizontal: 40,
        }}
      >
        Continue
      </Button>
    </View>
  );
}
