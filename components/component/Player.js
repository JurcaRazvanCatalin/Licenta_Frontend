import { StyleSheet } from "react-native";
import { View, Text, Image } from "react-native";
import Colors from "../UI/Colors";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import PlayerHeader from "./PlayerHeader";
import { ScrollView } from "react-native";
import PlayerHistory from "./PlayerHistory";
import { ActivityIndicator } from "react-native";

function Player({ route }) {
  const [player, setPlayer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { playerName, playerNameSmall, teamColor } = route.params;
  const navigation = useNavigation();
  const noAvailablePhoto =
    "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png?fbclid=IwAR1VIrlTu94YPaj0nxwQQAau3ejIxVAb6A91lpgsZ3_vJQVFLO8xgFlowuc";

  useEffect(() => {
    axios(
      `https://player.herokuapp.com/api/v2/players/create-player?playerNameSmall=${playerNameSmall}`
    ).then((response) => {
      setPlayer(response.data.players);
      // console.log(response.data.players);
      setIsLoading(false);
    });
  }, [player]);

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
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={"large"} color={Colors.white} />
        </View>
      ) : (
        player &&
        player.map((player) => {
          return (
            <PlayerHeader
              key={player._id}
              id={player._id}
              playerImg={player.playerImg}
              playerName={player.playerName}
              playerNameSmall={player.playerNameSmall}
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
              isPressed={player.isPressed}
              noAvailablePhoto={noAvailablePhoto}
            />
          );
        })
      )}
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
