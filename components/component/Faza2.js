import { View, Text, StyleSheet } from "react-native";
import Colors from "../UI/Colors";

function Faza2() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Faza 2</Text>
    </View>
  );
}

export default Faza2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey_500,
  },
  text: {
    color: Colors.white,
  },
});
