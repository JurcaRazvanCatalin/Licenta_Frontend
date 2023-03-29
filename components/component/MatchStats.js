import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import Colors from "../UI/Colors";
import HomeTeam from "./HomeTeam";
import AwayTeam from "./AwayTeam";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

function MatchStats({ route }) {
  const navigation = useNavigation();

  const {
    awayTeam,
    homeTeam,
    awayTeamScore,
    homeTeamScore,
    awayTeamLogo,
    homeTeamLogo,
    awayTeamStats,
    homeTeamStats,
  } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${homeTeam}  vs  ${awayTeam}`,
      headerTitleStyle: {
        fontSize: 14,
        color: Colors.white,
      },
    });
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.teamContainer}>
          <Image source={{ uri: homeTeamLogo }} style={styles.imageStyle} />
          <Text style={styles.score}>{homeTeamScore}</Text>
        </View>
        <Text style={styles.score}>-</Text>
        <View>
          <Image source={{ uri: awayTeamLogo }} style={styles.imageStyle} />
          <Text style={styles.score}>{awayTeamScore}</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.statsContainer}>
          <Image source={{ uri: homeTeamLogo }} style={styles.statsImage} />
          <Text style={styles.text}>{homeTeam}</Text>
        </View>
        <HomeTeam homeTeamStats={homeTeamStats} />
        <View style={styles.statsContainer}>
          <Image source={{ uri: awayTeamLogo }} style={styles.statsImage} />
          <Text style={styles.text}>{awayTeam}</Text>
        </View>
        <AwayTeam awayTeamStats={awayTeamStats} />
      </ScrollView>
    </View>
  );
}

export default MatchStats;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.grey_500,
  },
  container: {
    backgroundColor: Colors.grey_200,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "30%",
    marginBottom: 20,
  },
  teamContainer: {
    flexDirection: "column",
  },
  text: {
    color: Colors.white,
    fontSize: 20,
    textAlign: "center",
  },
  score: {
    color: Colors.white,
    fontSize: 40,
    textAlign: "center",
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 60,
    marginVertical: 5,
  },
  statsImage: {
    width: 30,
    height: 30,
    borderRadius: 60,
    marginHorizontal: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
