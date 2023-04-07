import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import Colors from "../components/UI/Colors";
import data from "../data";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

function TeamsContainer() {
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);
  const [teamsData, setTeamsData] = useState([]);

  const handlePress = () => {
    setIsPressed(!isPressed);
  };

  useEffect(() => {
    axios("https://teams.herokuapp.com/api/v1/teams/create-team").then(
      (response) => {
        setTeamsData(response.data.teams);
      }
    );
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {teamsData &&
          teamsData.map((team) => {
            return (
              <Pressable
                style={styles.teamContainer}
                android_ripple={{ color: Colors.grey_200 }}
                onPress={() => {
                  navigation.navigate("Team", {
                    smallTeamName: team.smallTeamName,
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
                  <TouchableOpacity style={[styles.star]} onPress={handlePress}>
                    {isPressed ? (
                      <Ionicons name="star" size={24} color={Colors.yellow} />
                    ) : (
                      <Ionicons name="star" size={24} color={Colors.grey_100} />
                    )}
                  </TouchableOpacity>
                </View>
              </Pressable>
            );
          })}
      </View>
    </ScrollView>
  );
}

export default TeamsContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey_500,
    alignItems: "center",
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
});
