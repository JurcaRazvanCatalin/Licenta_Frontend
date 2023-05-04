import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";

import TeamStanding from "./TeamStanding";

function PlayOffs() {
  const [data_playoffsSferturi, setData_PlayoffsSferturi] = useState([]);
  const [data_playoffsSemi, setData_PlayoffsSemi] = useState([]);
  const [data_playoffs5_8, setData_Playoffs5_8] = useState([]);
  const [isLoadingSferturi, setIsLoadingSferturi] = useState(true);
  const [isLoadingSemifinale, setIsLoadingSemifinale] = useState(true);
  const [isLoading5_8, setIsLoading5_8] = useState(true);

  useEffect(() => {
    axios(
      `https://standings.herokuapp.com/api/v1/teams/create-standings?phase=Playoffs&group=sferturi`
    ).then((response) => {
      setData_PlayoffsSferturi(response.data.teams);
      setIsLoadingSferturi(false);
    });
    axios(
      `https://standings.herokuapp.com/api/v1/teams/create-standings?phase=Playoffs&group=semifinale`
    ).then((response) => {
      setData_PlayoffsSemi(response.data.teams);
      setIsLoadingSemifinale(false);
    });
    axios(
      `https://standings.herokuapp.com/api/v1/teams/create-standings?phase=Playoffs&group=5-8`
    ).then((response) => {
      setData_Playoffs5_8(response.data.teams);
      setIsLoading5_8(false);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.groupText}>Sferturi de Finala</Text>
      <View style={styles.table}>
        <View style={styles.teamContainer}>
          <Text style={styles.headerText}>#</Text>
          <Text style={[styles.headerText, styles.nameContainer]}>Name</Text>
          <Text style={styles.headerText}>M</Text>
          <Text style={styles.headerText}>W</Text>
          <Text style={styles.headerText}>L</Text>
          <Text style={styles.headerText}>P</Text>
        </View>
        {isLoadingSferturi ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={"large"} color={Colors.white} />
          </View>
        ) : (
          data_playoffsSferturi &&
          data_playoffsSferturi.map((team) => {
            return (
              <TeamStanding
                key={team._id}
                ranking={team.ranking}
                teamLogo={team.teamLogo}
                smallTeamName={team.smallTeamName}
                teamName={team.teamName}
                matchesPlayed={team.matchesPlayed}
                winnedMatches={team.winnedMatches}
                lostMatches={team.lostMatches}
                pts={team.pts}
              />
            );
          })
        )}
      </View>
      <Text style={styles.groupText}>Semifinale</Text>
      <View style={styles.table}>
        <View style={styles.teamContainer}>
          <Text style={styles.headerText}>#</Text>
          <Text style={[styles.headerText, styles.nameContainer]}>Name</Text>
          <Text style={styles.headerText}>M</Text>
          <Text style={styles.headerText}>W</Text>
          <Text style={styles.headerText}>L</Text>
          <Text style={styles.headerText}>P</Text>
        </View>
        {isLoadingSemifinale ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={"large"} color={Colors.white} />
          </View>
        ) : (
          data_playoffsSemi &&
          data_playoffsSemi.map((team) => {
            return (
              <TeamStanding
                key={team._id}
                ranking={team.ranking}
                teamLogo={team.teamLogo}
                smallTeamName={team.smallTeamName}
                teamName={team.teamName}
                matchesPlayed={team.matchesPlayed}
                winnedMatches={team.winnedMatches}
                lostMatches={team.lostMatches}
                pts={team.pts}
              />
            );
          })
        )}
      </View>
      <Text style={styles.groupText}>Locurile 5-8</Text>
      <View style={styles.table}>
        <View style={styles.teamContainer}>
          <Text style={styles.headerText}>#</Text>
          <Text style={[styles.headerText, styles.nameContainer]}>Name</Text>
          <Text style={styles.headerText}>M</Text>
          <Text style={styles.headerText}>W</Text>
          <Text style={styles.headerText}>L</Text>
          <Text style={styles.headerText}>P</Text>
        </View>
        {isLoading5_8 ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={"large"} color={Colors.white} />
          </View>
        ) : (
          data_playoffs5_8 &&
          data_playoffs5_8.map((team) => {
            return (
              <TeamStanding
                key={team._id}
                ranking={team.ranking}
                teamLogo={team.teamLogo}
                smallTeamName={team.smallTeamName}
                teamName={team.teamName}
                matchesPlayed={team.matchesPlayed}
                winnedMatches={team.winnedMatches}
                lostMatches={team.lostMatches}
                pts={team.pts}
              />
            );
          })
        )}
      </View>
    </ScrollView>
  );
}

export default PlayOffs;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.grey_500,
  },
  teamContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  imgSize: {
    height: 30,
    width: 30,
    borderRadius: 60,
  },
  groupText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey_100,
    padding: 10,
  },
  table: {
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    textAlign: "center",
    width: 35,
    color: Colors.white,
  },
  nameContainer: {
    flex: 1,
    textAlign: "center",
    borderRightWidth: 1,
    marginHorizontal: 10,
    borderRightColor: Colors.grey_300,
  },
  teamContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey_300,
  },
  teamName: {
    flex: 1,
    color: Colors.white,
    marginHorizontal: 10,
    borderRightWidth: 1,
    borderRightColor: Colors.grey_300,
  },
  tableText: {
    flex: 1,
    textAlign: "center",
    color: Colors.white,
  },
  text: {
    color: Colors.white,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
