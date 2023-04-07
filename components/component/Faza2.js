import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import Colors from "../UI/Colors";
const API_URI = "https://standings.herokuapp.com/api/v1/teams/create-standings";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

function Faza2() {
  const [data1_10, setData1_10] = useState([]);
  const [data11_19, setData11_19] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios(`${API_URI}?phase=2&group=1-10`).then((response) => {
      // console.log(response.data.teams);
      setData1_10(response.data.teams);
    });
    axios(`${API_URI}?phase=2&group=11-19`).then((response) => {
      // console.log(response.data.teams);
      setData11_19(response.data.teams);
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
        {data1_10 &&
          data1_10.map((team) => {
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
        {data11_19 &&
          data11_19.map((team) => {
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
});
