import { Text, View, StyleSheet } from "react-native";
import Colors from "../UI/Colors";

function AwayTeam() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Away Team</Text>
    </View>
  );
}

export default AwayTeam;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey_500,
  },
  text: {
    color: Colors.white,
  },
});
