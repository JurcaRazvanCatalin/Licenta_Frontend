import { StyleSheet } from "react-native";
import { View, Text, Image } from "react-native";
import Colors from "../UI/Colors";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";

function Player({ route }) {
  const [player, setPlayer] = useState([]);
  const { playerName, playerNameSmall, teamColor } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    axios(
      `https://players.herokuapp.com/api/v1/players/create-player?playerNameSmall=${playerNameSmall}`
    ).then((response) => {
      setPlayer(response.data.players);
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${playerName}`,
      headerTitleStyle: {
        fontSize: 20,
        color: Colors.white,
      },
    });
  });

  return (
    <View style={[styles.container, { backgroundColor: teamColor }]}>
      {player &&
        player.map((player, index) => {
          return (
            <View key={index}>
              <Image
                source={{ uri: player.playerImg }}
                style={styles.playerImg}
              />
              <Text>{player.playerName}</Text>
            </View>
          );
        })}
    </View>
  );
}

export default Player;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.white,
  },
  playerImg: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },
});
