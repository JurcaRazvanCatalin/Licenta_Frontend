import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Colors from "../components/UI/Colors";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { deleteFavorite, storeFavorites } from "../http";

function TeamsContainer() {
  const navigation = useNavigation();
  const [teamsData, setTeamsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handlePress = (index) => {
    const teams = [...teamsData];
    teams[index].isPressed = !teams[index].isPressed;
    setTeamsData(teams);

    const team = teams[index];

    if (team.isPressed) {
      axios
        .post(
          "https://licenta-cbmr-default-rtdb.firebaseio.com/favoritesTeams.json",
          team
        )
        .then((response) => {
          const firebaseId = response.data.name;
          const updatedTeam = { ...team, firebaseId };
          teams[index] = updatedTeam;
          setTeamsData(teams);
        });
    } else {
      const firebaseId = team.firebaseId;
      deleteFavorite(firebaseId);
    }
  };

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
              <Pressable
                style={[
                  styles.teamContainer,
                  ({ pressed }) => {
                    pressed ? styles.buttonPressed : null;
                  },
                ]}
                android_ripple={{ color: Colors.grey_200 }}
                onPress={() => {
                  navigation.navigate("Team", {
                    smallTeamName: team.smallTeamName,
                    teamName: team.teamName,
                  });
                }}
                key={team._id}
              >
                <View key={team.id} style={styles.teamDataContainer}>
                  <Image
                    source={{ uri: team.teamLogo }}
                    style={styles.logoContainer}
                  />
                  <Text style={styles.text}>{team.teamName}</Text>
                  <TouchableOpacity
                    style={[styles.star]}
                    onPress={() => {
                      handlePress(index);
                    }}
                  >
                    <Ionicons
                      name="star"
                      size={24}
                      color={team.isPressed ? Colors.yellow : Colors.grey_100}
                    />
                  </TouchableOpacity>
                </View>
              </Pressable>
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
  star: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
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
