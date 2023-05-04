import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Colors from "../components/UI/Colors";

function AccountScreen() {
  const [favoritesPlayers, setFavoritesPlayers] = useState([]);
  const [favoritesTeams, setFavoritesTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(true);

  useEffect(() => {
    axios(
      "https://licenta-cbmr-default-rtdb.firebaseio.com/favoritesPlayers.json"
    ).then((response) => {
      const players = [];
      for (const key in response.data) {
        const player = {
          id: key,
          playerImg: response.data[key].playerImg,
          playerName: response.data[key].playerName,
          playerNameSmall: response.data[key].playerNameSmall,
          teamLogo: response.data[key].teamLogo,
          teamName: response.data[key].teamName,
        };
        players.push(player);
      }
      setFavoritesPlayers(players);
      setIsLoading(false);
    });
  }, [favoritesPlayers]);

  useEffect(() => {
    axios(
      "https://licenta-cbmr-default-rtdb.firebaseio.com/favoritesTeams.json"
    ).then((response) => {
      const teams = [];
      for (const key in response.data) {
        const team = {
          id: key,
          isPressed: response.data[key].isPressed,
          teamLogo: response.data[key].teamLogo,
          teamName: response.data[key].teamName,
          smallTeamName: response.data[key].smallTeamName,
        };
        teams.push(team);
      }
      setFavoritesTeams(teams);
      setIsLoading1(false);
    });
  }, [favoritesTeams]);

  return (
    <View style={styles.container}>
      <View>
        <Text>Favorite players</Text>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={"large"} color={Colors.yellow} />
          </View>
        ) : (
          favoritesPlayers &&
          favoritesPlayers.map((player) => {
            return (
              <View key={player.id}>
                <Text>{player.playerName}</Text>
              </View>
            );
          })
        )}
      </View>
      <View>
        <Text>Favorite Teams</Text>
        {isLoading1 ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={"large"} color={Colors.yellow} />
          </View>
        ) : (
          favoritesTeams &&
          favoritesTeams.map((team) => {
            return (
              <View key={team.id}>
                <Text>{team.teamName}</Text>
              </View>
            );
          })
        )}
      </View>
    </View>
  );
}

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey_500,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
