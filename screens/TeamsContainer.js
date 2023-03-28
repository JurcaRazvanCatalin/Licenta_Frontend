import { Text, View, StyleSheet } from "react-native";
import Colors from "../components/UI/Colors";

function TeamsContainer() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Teams Container</Text>
    </View>
  );
}

export default TeamsContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey_500,
  },
  text: {
    color: Colors.white,
  },
});
