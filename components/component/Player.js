import { StyleSheet } from "react-native";
import { View, Text, Image } from "react-native";
import Colors from "../UI/Colors";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import PlayerHeader from "./PlayerHeader";
import { ScrollView } from "react-native";
import PlayerHistory from "./PlayerHistory";

function Player({ route }) {
  const [player, setPlayer] = useState([]);
  const { playerName, playerNameSmall, teamColor } = route.params;
  const navigation = useNavigation();
  const noAvailablePhoto =
    "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png?fbclid=IwAR1VIrlTu94YPaj0nxwQQAau3ejIxVAb6A91lpgsZ3_vJQVFLO8xgFlowuc";

  useEffect(() => {
    axios(
      `https://players.herokuapp.com/api/v1/players/create-player?playerNameSmall=${playerNameSmall}`
    ).then((response) => {
      setPlayer(response.data.players);
      // console.log(response.data.players);
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
    <View style={styles.container}>
      {player &&
        player.map((player) => {
          return (
            <PlayerHeader
              key={player._id}
              playerImg={player.playerImg}
              playerName={player.playerName}
              teamName={player.teamName}
              teamLogo={player.teamLogo}
              playerCountry={player.playerCountry}
              position={player.position}
              birthday={player.birthday}
              height={player.height}
              weight={player.weight}
              number={player.number}
              pts_per_game={player.pts_per_game}
              reb_per_game={player.reb_per_game}
              ass_per_game={player.ass_per_game}
              eff={player.eff}
              noAvailablePhoto={noAvailablePhoto}
            />
          );
        })}
      {player &&
        player.map((player, index) => {
          return (
            <ScrollView key={player._id}>
              <PlayerHistory
                stats={player.stats}
                playerName={player.playerName}
              />
            </ScrollView>
          );
        })}
    </View>
  );
}

export default Player;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
