import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Colors from "../UI/Colors";
import ImageSvg from "react-native-remote-svg";
import TeamYearlyStats from "./TeamYearlyStats";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function Team({ route }) {
  const { smallTeamName, teamName, isPressed, teamLogo } = route.params;
  const [playerData, setPlayerData] = useState([]);
  const [firebaseData, setFirebaseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [teamData, setTeamData] = useState([]);
  const noAvailablePhoto =
    "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png?fbclid=IwAR1VIrlTu94YPaj0nxwQQAau3ejIxVAb6A91lpgsZ3_vJQVFLO8xgFlowuc";
  const navigation = useNavigation();

  const teamDatas = {
    teamName: teamName,
    smallTeamName: smallTeamName,
    teamLogo: teamLogo,
  };

  useEffect(() => {
    axios(
      `https://players.herokuapp.com/api/v1/players/create-player?smallTeamName=${smallTeamName}`
    ).then((response) => {
      setPlayerData(response.data.players);
    });
    axios(
      `https://teams.herokuapp.com/api/v1/teams/create-team?smallTeamName=${smallTeamName}`
    ).then((response) => {
      setTeamData(response.data.teams);
      setIsLoading(false);
    });
    // console.log(teamData);
  }, [teamData, isPressed]);

  useEffect(() => {
    const fetchFirebaseData = async () => {
      const response = await axios(
        `https://licenta-cbmr-default-rtdb.firebaseio.com/favoritesTeams.json?orderBy="smallTeamName"&equalTo="${smallTeamName}"&limitToFirst=1`
      );
      const teamData = response.data ? Object.values(response.data)[0] : null;
      setFirebaseData(teamData);
    };
    fetchFirebaseData();
  }, [smallTeamName, isPressed]);

  const handlePress = async () => {
    const updatedIsPressed = !teamData[0].isPressed;
    console.log(updatedIsPressed);

    if (updatedIsPressed) {
      if (firebaseData) {
        console.log(`Team already in Firebase`);
        return;
      }
      await axios
        .post(
          "https://licenta-cbmr-default-rtdb.firebaseio.com/favoritesTeams.json",
          teamDatas
        )
        .then((response) => {
          const firebaseId = response.data.name;
          const updatedTeam = { ...firebaseData, firebaseId };
          setFirebaseData(updatedTeam);
        });
    } else {
      const response = await axios(
        `https://licenta-cbmr-default-rtdb.firebaseio.com/favoritesTeams.json?orderBy="smallTeamName"&equalTo="${smallTeamName}"&limitToFirst=1`
      );

      const teamToDelete = Object.keys(response.data)[0];
      console.log(teamToDelete);

      if (teamToDelete) {
        await axios.delete(
          `https://licenta-cbmr-default-rtdb.firebaseio.com/favoritesTeams/${teamToDelete}.json`
        );
      } else {
        console.log(`Team Not found in database`);
      }
      setFirebaseData(null);
    }
    await axios.patch(
      `https://teams.herokuapp.com/api/v1/teams/create-team/${smallTeamName}`,
      { isPressed: updatedIsPressed }
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${teamName}`,
      headerTitleStyle: {
        fontSize: 21,
        color: Colors.white,
      },
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={"large"} color={Colors.white} />
        </View>
      ) : (
        <>
          {teamData &&
            teamData.map((team) => {
              return (
                <View
                  key={team._id}
                  style={[
                    styles.container,
                    { backgroundColor: team.color_one },
                  ]}
                >
                  <View style={styles.header}>
                    <Image
                      source={{ uri: team.teamLogo }}
                      style={[styles.logo, styles.headerComponents]}
                    />
                    <Text
                      style={[
                        styles.text,
                        styles.headerComponents,
                        styles.teamName,
                      ]}
                    >
                      {team.teamName}
                    </Text>
                    <TouchableOpacity onPress={handlePress}>
                      {team.isPressed ? (
                        <Ionicons name="star" size={24} color={Colors.yellow} />
                      ) : (
                        <Ionicons
                          name="star"
                          size={24}
                          color={Colors.grey_100}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  <View style={styles.header}>
                    <Text style={styles.textHeader}>{team.coach}</Text>
                  </View>
                  <View style={styles.header}>
                    <Text style={styles.textHeader}>{team.year_founded}</Text>
                  </View>
                </View>
              );
            })}
          <ScrollView>
            <View style={[styles.playerContainer]}>
              <Text style={[styles.cell, styles.text, styles.nameContainer]}>
                Name
              </Text>
              <Text style={[styles.text, { fontWeight: "bold", fontSize: 11 }]}>
                #
              </Text>
              <Text style={[styles.text, { fontWeight: "bold", fontSize: 11 }]}>
                Country
              </Text>
            </View>
            {playerData &&
              playerData.map((player) => {
                return (
                  <View key={player._id} style={styles.playerContainer}>
                    {player.playerImg === "/images/site/no-player-image.svg" ? (
                      <Image
                        source={{ uri: noAvailablePhoto }}
                        style={styles.playerLogo}
                      />
                    ) : (
                      <Image
                        source={{ uri: player.playerImg }}
                        style={styles.playerLogo}
                      />
                    )}
                    <Pressable
                      onPress={() => {
                        navigation.navigate("Player", {
                          playerName: player.playerName,
                          playerNameSmall: player.playerNameSmall,
                        });
                      }}
                      android_ripple={{ color: Colors.grey_200 }}
                      style={{ width: "62.5%" }}
                    >
                      <View style={styles.nameContainer}>
                        <Text style={styles.text}>{player.playerName}</Text>
                        <Text style={[styles.text, styles.position]}>
                          {player.position}
                        </Text>
                      </View>
                    </Pressable>
                    <Text style={[styles.text, styles.marginNrCountry]}>
                      #{player.number}
                    </Text>
                    <View style={styles.countryContainer}>
                      <ImageSvg
                        style={[styles.country]}
                        source={{ uri: player.playerCountry }}
                      />
                    </View>
                  </View>
                );
              })}
            {teamData &&
              teamData.map((team) => {
                return (
                  <TeamYearlyStats
                    key={team._id}
                    stats={team.yearlyStats}
                    teamName={team.teamName}
                    teamLogo={team.teamLogo}
                  />
                );
              })}
          </ScrollView>
        </>
      )}
    </View>
  );
}

export default Team;

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
    padding: 6,
    marginLeft: 6,
    marginHorizontal: 5,
  },
  container: {
    height: "20%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 60,
  },
  headerComponents: {
    marginHorizontal: 20,
  },
  teamName: {
    fontSize: 17,
  },
  playerContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey_200,
  },
  playerLogo: {
    height: 40,
    width: 40,
    borderRadius: 60,
  },
  country: {
    height: 20,
    width: 20,
    // borderRadius: 60
  },
  countryContainer: {
    padding: 10,
  },
  nameContainer: {
    flexDirection: "column",
  },
  position: {
    marginTop: -15,
    color: Colors.grey_100,
  },
  cell: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 11,
  },
  nameContainer: {
    width: 170,
    flex: 1,
  },
  marginNrCountry: {
    marginHorizontal: 30,
    textAlign: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  star: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "flex-end",
  },
  textHeader: {
    color: Colors.white,
    fontWeight: 700,
    marginLeft: 6,
    marginHorizontal: 5,
  },
});
