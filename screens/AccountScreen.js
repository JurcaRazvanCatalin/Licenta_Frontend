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
import FavoritePlayers from "../components/component/FavoritePlayers";
import FavoriteTeams from "../components/component/FavoriteTeams";

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
        <Text style={styles.title}>Favorite players</Text>
        <ScrollView horizontal={true}>
          {isLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size={"large"} color={Colors.yellow} />
            </View>
          ) : (
            favoritesPlayers &&
            favoritesPlayers.map((player) => {
              return (
                <FavoritePlayers
                  key={player.id}
                  playerImg={player.playerImg}
                  playerName={player.playerName}
                  playerNameSmall={player.playerNameSmall}
                />
              );
            })
          )}
        </ScrollView>
      </View>
      <View>
        <Text style={styles.title}>Favorite Teams</Text>
        {isLoading1 ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={"large"} color={Colors.yellow} />
          </View>
        ) : (
          favoritesTeams &&
          favoritesTeams.map((team) => {
            return (
              <FavoriteTeams
                key={team.id}
                teamLogo={team.teamLogo}
                teamName={team.teamName}
                smallTeamName={team.smallTeamName}
              />
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
  title: {
    fontSize: 25,
    fontWeight: 700,
    padding: 20,
    color: Colors.white,
  },
});
