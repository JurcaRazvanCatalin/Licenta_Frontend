import { Text, View, StyleSheet, Image } from "react-native";
import Colors from "../UI/Colors";

function MatchStats({ navigation, route }) {
  const {
    awayTeam,
    homeTeam,
    awayTeamScore,
    homeTeamScore,
    awayTeamLogo,
    homeTeamLogo,
  } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.teamContainer}>
        <Image source={{ uri: homeTeamLogo }} style={styles.imageStyle} />
        <Text style={styles.text}>{homeTeamScore}</Text>
      </View>
      <Text style={styles.text}>-</Text>
      <View>
        <Image source={{ uri: awayTeamLogo }} style={styles.imageStyle} />
        <Text style={styles.text}>{awayTeamScore}</Text>
      </View>
    </View>
  );
}

export default MatchStats;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey_500,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "30%",
  },
  teamContainer: {
    flexDirection: "column",
  },
  text: {
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
});
