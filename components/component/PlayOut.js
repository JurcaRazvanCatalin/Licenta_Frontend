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
const API_URI = "https://standings.herokuapp.com/api/v1/teams/create-standings";

function PlayOffs() {
  const [data_playoffs, setData_Playoffs] = useState([]);
  const [data_playoffs11_14, setData_Playoffs11_14] = useState([]);
  const [data_playoffs15_18, setData_Playoffs15_18] = useState([]);
  const [isLoadingTurul1, setIsLodingTurul1] = useState(true);
  const [isLoading11_14, setIsLoading11_14] = useState(true);
  const [isLoading15_18, setIsLoading15_18] = useState(true);

  useEffect(() => {
    axios(
      `https://standingss.herokuapp.com/api/v2/teams/create-standings?phase=Playout&group=turul1`
    ).then((response) => {
      setData_Playoffs(response.data.teams);
      console.log(response.data.teams);
      setIsLodingTurul1(false);
    });
  }, []);

  useEffect(() => {
    axios(
      `https://standingss.herokuapp.com/api/v2/teams/create-standings?phase=Playout&group=11-14`
    ).then((response) => {
      setData_Playoffs11_14(response.data.teams);
      console.log(response.data.teams);
      setIsLoading11_14(false);
    });
  }, []);

  useEffect(() => {
    axios(
      `https://standingss.herokuapp.com/api/v2/teams/create-standings?phase=Playout&group=15-18`
    ).then((response) => {
      setData_Playoffs15_18(response.data.teams);
      console.log(response.data.teams);
      setIsLoading15_18(false);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.groupText}>Turul 1</Text>
      <View style={styles.table}>
        <View style={styles.teamContainer}>
          <Text style={styles.headerText}>#</Text>
          <Text style={[styles.headerText, styles.nameContainer]}>Name</Text>
          <Text style={styles.headerText}>M</Text>
          <Text style={styles.headerText}>W</Text>
          <Text style={styles.headerText}>L</Text>
          <Text style={styles.headerText}>P</Text>
        </View>
        {isLoadingTurul1 ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={"large"} color={Colors.white} />
          </View>
        ) : (
          data_playoffs &&
          data_playoffs.map((team) => {
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
      <Text style={styles.groupText}>Locurile 11-14</Text>
      <View style={styles.table}>
        <View style={styles.teamContainer}>
          <Text style={styles.headerText}>#</Text>
          <Text style={[styles.headerText, styles.nameContainer]}>Name</Text>
          <Text style={styles.headerText}>M</Text>
          <Text style={styles.headerText}>W</Text>
          <Text style={styles.headerText}>L</Text>
          <Text style={styles.headerText}>P</Text>
        </View>
        {isLoading11_14 ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={"large"} color={Colors.white} />
          </View>
        ) : (
          data_playoffs11_14 &&
          data_playoffs11_14.map((team) => {
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
      <Text style={styles.groupText}>Locurile 15-18</Text>
      <View style={styles.table}>
        <View style={styles.teamContainer}>
          <Text style={styles.headerText}>#</Text>
          <Text style={[styles.headerText, styles.nameContainer]}>Name</Text>
          <Text style={styles.headerText}>M</Text>
          <Text style={styles.headerText}>W</Text>
          <Text style={styles.headerText}>L</Text>
          <Text style={styles.headerText}>P</Text>
        </View>
        {isLoading15_18 ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={"large"} color={Colors.white} />
          </View>
        ) : (
          data_playoffs15_18 &&
          data_playoffs15_18.map((team) => {
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
