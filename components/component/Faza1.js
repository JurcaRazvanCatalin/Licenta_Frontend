import { Text, View, StyleSheet } from "react-native";
import Colors from "../UI/Colors";

function Faza1() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Faza 1</Text>
    </View>
  );
}

export default Faza1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey_500,
  },
  text: {
    color: Colors.white,
  },
});
