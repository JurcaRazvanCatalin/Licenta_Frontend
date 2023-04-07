import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import Colors from "../UI/Colors";
import { useEffect, useState } from "react";
const API_URI = "https://standings.herokuapp.com/api/v1/teams/create-standings";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

function Faza1() {
  const [dataA, setDataA] = useState([]);
  const [dataB, setDataB] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios(`${API_URI}?phase=1&group=A`).then((response) => {
      // console.log(response.data.teams);
      setDataA(response.data.teams);
    });
    axios(`${API_URI}?phase=1&group=B`).then((response) => {
      // console.log(response.data.teams);
      setDataB(response.data.teams);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.groupText}>Grupa A</Text>
      <View style={styles.table}>
        <View style={styles.teamContainer}>
          <Text style={styles.headerText}>#</Text>
          <Text style={[styles.headerText, styles.nameContainer]}>Name</Text>
          <Text style={styles.headerText}>M</Text>
          <Text style={styles.headerText}>W</Text>
          <Text style={styles.headerText}>L</Text>
          <Text style={styles.headerText}>P</Text>
        </View>
        {dataA &&
          dataA.map((team) => {
            return (
              <View key={team._id} style={styles.teamContainer}>
                <Text style={styles.headerText}>{team.ranking}.</Text>
                <Image source={{ uri: team.teamLogo }} style={styles.imgSize} />
                <Pressable
                  style={styles.teamName}
                  android_ripple={{ color: Colors.grey_300 }}
                  onPress={() => {
                    navigation.navigate("Team", {
                      smallTeamName: team.smallTeamName,
                    });
                  }}
                >
                  <Text style={styles.text}>{team.teamName}</Text>
                </Pressable>
                <Text style={styles.headerText}>{team.matchesPlayed}</Text>
                <Text style={styles.headerText}>{team.winnedMatches}</Text>
                <Text style={styles.headerText}>{team.lostMatches}</Text>
                <Text style={styles.headerText}>{team.pts}</Text>
              </View>
            );
          })}
      </View>
      <Text style={styles.groupText}>Grupa B</Text>
      <View style={styles.table}>
        <View style={styles.teamContainer}>
          <Text style={styles.headerText}>#</Text>
          <Text style={[styles.headerText, styles.nameContainer]}>Name</Text>
          <Text style={styles.headerText}>M</Text>
          <Text style={styles.headerText}>W</Text>
          <Text style={styles.headerText}>L</Text>
          <Text style={styles.headerText}>P</Text>
        </View>
        {dataB &&
          dataB.map((team) => {
            return (
              <View key={team._id} style={styles.teamContainer}>
                <Text style={styles.headerText}>{team.ranking}.</Text>
                <Image source={{ uri: team.teamLogo }} style={styles.imgSize} />
                <Pressable
                  style={styles.teamName}
                  android_ripple={{ color: Colors.grey_300 }}
                  onPress={() => {
                    navigation.navigate("Team", {
                      smallTeamName: team.smallTeamName,
                    });
                  }}
                >
                  <Text style={styles.text}>{team.teamName}</Text>
                </Pressable>
                <Text style={styles.headerText}>{team.matchesPlayed}</Text>
                <Text style={styles.headerText}>{team.winnedMatches}</Text>
                <Text style={styles.headerText}>{team.lostMatches}</Text>
                <Text style={styles.headerText}>{team.pts}</Text>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
}

export default Faza1;

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
    marginHorizontal: 10,
    borderRightWidth: 1,
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
    borderRightWidth: 1,
    borderRightColor: Colors.grey_300,
    marginHorizontal: 10,
  },
  tableText: {
    flex: 1,
    textAlign: "center",
    color: Colors.white,
  },
  text: {
    color: Colors.white,
  },
});
