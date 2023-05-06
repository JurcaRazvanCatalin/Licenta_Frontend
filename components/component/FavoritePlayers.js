import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import Colors from "../UI/Colors";
import { useNavigation } from "@react-navigation/native";

function FavoritePlayers({ playerImg, playerName, playerNameSmall }) {
  const navigation = useNavigation();

  return (
    <View style={styles.imgContainer}>
      <View style={{ flexDirection: "column" }}>
        <Pressable
          onPress={() => {
            navigation.navigate("Player", {
              playerName: playerName,
              playerNameSmall: playerNameSmall,
            });
          }}
        >
          <Image source={{ uri: playerImg }} style={styles.image} />
          <Text style={styles.playerNameTitle}>{playerName}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default FavoritePlayers;

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    margin: 15,
    borderRadius: 50,
  },
  imgContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  playerNameTitle: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 10,
  },
});
