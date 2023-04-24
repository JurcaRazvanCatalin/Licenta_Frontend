import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

function PlayerStat({
  ranking,
  playerName,
  teamName,
  matchesPlayed,
  mediumStats,
}) {
  return (
    <View style={styles.playerStat}>
      <Text style={[styles.text, styles.stat]}>{ranking}</Text>
      <Text style={[styles.text, styles.stat]}>{playerName}</Text>
      <Text style={[styles.text, styles.stat]}>{teamName}</Text>
      <Text style={[styles.text, styles.stat]}>{matchesPlayed}</Text>
      <Text style={[styles.text, styles.stat]}>{mediumStats}</Text>
    </View>
  );
}

export default PlayerStat;

const styles = StyleSheet.create({
  playerStat: {
    flexDirection: "row",
  },
  text: {
    color: "white",
  },

  stat: {
    marginHorizontal: 10,
    fontSize: 12,
    marginVertical: 10,
  },
});
