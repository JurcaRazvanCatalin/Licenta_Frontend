import { Text, View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../UI/Colors";

function PlayerStat({
  ranking,
  playerName,
  teamName,
  matchesPlayed,
  mediumStats,
  playerNameSmall,
  smallTeamName,
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <Text style={{ flex: 1.3, textAlign: "center", color: Colors.yellow }}>
        {ranking}.
      </Text>
      <Pressable
        style={[
          styles.headerCell,
          ({ pressed }) => {
            pressed ? styles.buttonPressed : null;
          },
        ]}
        android_ripple={{ color: Colors.grey_200 }}
        onPress={() => {
          navigation.navigate("Player", {
            playerName: playerName,
            playerNameSmall: playerNameSmall,
          });
        }}
      >
        <Text style={styles.text}>{playerName}</Text>
      </Pressable>
      <Pressable
        style={[
          styles.headerCell,
          ({ pressed }) => {
            pressed ? styles.buttonPressed : null;
          },
        ]}
        android_ripple={{ color: Colors.grey_200 }}
        onPress={() => {
          navigation.navigate("Team", {
            smallTeamName: smallTeamName,
            teamName: teamName,
          });
        }}
      >
        <Text style={[styles.text, { textAlign: "center" }]}>{teamName}</Text>
      </Pressable>
      <Text style={styles.smallCell}>{matchesPlayed}</Text>
      <Text style={styles.smallCell}>{mediumStats}</Text>
    </View>
  );
}

export default PlayerStat;

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    textAlign: "left",
    color: Colors.white,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey_200,
    paddingBottom: 10,
  },
  headerCell: {
    flex: 4,
  },
  smallCell: { flex: 2, textAlign: "center", color: Colors.white },
  border: {
    borderWidth: 2,
    borderColor: Colors.grey_200,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
