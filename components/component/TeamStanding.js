import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

function TeamStanding({
  ranking,
  teamLogo,
  smallTeamName,
  teamName,
  matchesPlayed,
  winnedMatches,
  lostMatches,
  pts,
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.teamContainer}>
      <Text style={styles.headerText}>{ranking}.</Text>
      <Image source={{ uri: teamLogo }} style={styles.imgSize} />
      <Pressable
        style={styles.teamName}
        android_ripple={{ color: Colors.grey_300 }}
        onPress={() => {
          navigation.navigate("Team", {
            smallTeamName: smallTeamName,
            teamName: teamName,
          });
        }}
      >
        <Text style={styles.text}>{teamName}</Text>
      </Pressable>
      <Text style={styles.headerText}>{matchesPlayed}</Text>
      <Text style={styles.headerText}>{winnedMatches}</Text>
      <Text style={styles.headerText}>{lostMatches}</Text>
      <Text style={styles.headerText}>{pts}</Text>
    </View>
  );
}

export default TeamStanding;

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
