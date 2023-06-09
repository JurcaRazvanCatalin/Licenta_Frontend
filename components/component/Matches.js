import { Text, View, StyleSheet, Image } from "react-native";
import Colors from "../UI/Colors";

function Matches({
  awayTeam,
  homeTeam,
  awayTeamLogo,
  homeTeamLogo,
  matchTime,
  awayTeamScore,
  homeTeamScore,
}) {
  const Compare = () => {
    if (awayTeamScore !== "-") {
      return (
        <View style={styles.matchContainer}>
          <View style={styles.teamsContainer}>
            <View style={styles.teamContainer}>
              <Image source={{ uri: homeTeamLogo }} style={styles.imageStyle} />
              <Text style={styles.teamName}>{homeTeam}</Text>
            </View>
            <Text style={styles.score}>{homeTeamScore}</Text>
            <Text style={styles.scoreSeparator}>-</Text>
            <Text style={styles.score}>{awayTeamScore}</Text>
            <View style={styles.teamContainer}>
              <Image source={{ uri: awayTeamLogo }} style={styles.imageStyle} />
              <Text style={styles.teamName}>{awayTeam}</Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.matchContainer}>
          <View style={styles.teamsContainer}>
            <View style={styles.teamContainer}>
              <Image source={{ uri: homeTeamLogo }} style={styles.imageStyle} />
              <Text style={styles.teamName}>{homeTeam}</Text>
            </View>
            <Text style={styles.matchTime}>{matchTime}</Text>
            <View style={styles.teamContainer}>
              <Image source={{ uri: awayTeamLogo }} style={styles.imageStyle} />
              <Text style={styles.teamName}>{awayTeam}</Text>
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <View>
      <Compare />
    </View>
  );
}

export default Matches;

const styles = StyleSheet.create({
  matchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.grey_400,
    borderRadius: 10,
    marginVertical: 5,
  },
  teamsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  teamContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  teamName: {
    fontSize: 8,
    fontWeight: "bold",
    marginBottom: 5,
    color: Colors.white,
  },
  score: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.white,
  },
  scoreSeparator: {
    fontSize: 20,
    color: Colors.white,
  },
  imageStyle: {
    width: 60,
    height: 60,
    borderRadius: 60,
    marginVertical: 5,
  },
  matchTime: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.white,
  },
});
