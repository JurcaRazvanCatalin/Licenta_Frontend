import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import Colors from "../components/UI/Colors";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

import axios from "axios";
import { deleteFavorite, storeFavorites } from "../http";
import TeamContainer from "../components/component/TeamContainer";

function TeamsContainer() {
  const [teamsData, setTeamsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios("https://teams.herokuapp.com/api/v1/teams/create-team").then(
      (response) => {
        const teams = response.data.teams.map((team) => ({
          ...team,
        }));
        setTeamsData(teams);
        setIsLoading(false);
      }
    );
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={"large"} color={Colors.white} />
        </View>
      ) : (
        <ScrollView>
          {teamsData.map((team, index) => {
            return (
              <TeamContainer
                teamName={team.teamName}
                smallTeamName={team.smallTeamName}
                teamLogo={team.teamLogo}
                key={team._id}
                isPressed={team.isPressed}
                coach={team.coach}
              />
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

export default TeamsContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey_500,
    padding: 20,
  },
  teamContainer: {
    backgroundColor: Colors.grey_400,
    borderRadius: 10,
    padding: 20,
    width: "100%",
    marginVertical: 20,
  },
  text: {
    color: Colors.white,
    padding: 15,
  },
  teamDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoContainer: {
    height: 50,
    width: 50,
    borderRadius: 60,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
