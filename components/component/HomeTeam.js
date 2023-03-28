import { Text, View, StyleSheet } from "react-native";
import Colors from "../UI/Colors";

function HomeTeam({ route }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Team</Text>
    </View>
  );
}

export default HomeTeam;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey_500,
  },
  text: {
    color: Colors.white,
  },
});
