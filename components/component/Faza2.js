import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Colors from "../UI/Colors";
const API_URI = "https://standings.herokuapp.com/api/v1/teams/create-standings";
import axios from "axios";
import { useEffect, useState } from "react";
import TeamStanding from "./TeamStanding";

function Faza2() {
  const [data1_10, setData1_10] = useState([]);
  const [data11_19, setData11_19] = useState([]);
  const [isLoading1_10, setIsLoading1_10] = useState(true);
  const [isLoading11_19, setIsLoading11_19] = useState(true);

  useEffect(() => {
    axios(`${API_URI}?phase=2&group=1-10`).then((response) => {
      // console.log(response.data.teams);
      setData1_10(response.data.teams);
      setIsLoading1_10(false);
    });
    axios(`${API_URI}?phase=2&group=11-19`).then((response) => {
      // console.log(response.data.teams);
      setData11_19(response.data.teams);
      setIsLoading11_19(false);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.groupText}>Grupa 1-10</Text>
      <View style={styles.table}>
        <View style={styles.teamContainer}>
          <Text style={styles.headerText}>#</Text>
          <Text style={[styles.headerText, styles.nameContainer]}>Name</Text>
          <Text style={styles.headerText}>M</Text>
          <Text style={styles.headerText}>W</Text>
          <Text style={styles.headerText}>L</Text>
          <Text style={styles.headerText}>P</Text>
        </View>
        {isLoading1_10 ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={"large"} color={Colors.white} />
          </View>
        ) : (
          data1_10 &&
          data1_10.map((team) => {
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
      <Text style={styles.groupText}>Grupa 11-19</Text>
      <View style={styles.table}>
        <View style={styles.teamContainer}>
          <Text style={styles.headerText}>#</Text>
          <Text style={[styles.headerText, styles.nameContainer]}>Name</Text>
          <Text style={styles.headerText}>M</Text>
          <Text style={styles.headerText}>W</Text>
          <Text style={styles.headerText}>L</Text>
          <Text style={styles.headerText}>P</Text>
        </View>
        {isLoading11_19 ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={"large"} color={Colors.white} />
          </View>
        ) : (
          data11_19 &&
          data11_19.map((team) => {
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

export default Faza2;

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
