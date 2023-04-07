import { View, Text, StyleSheet } from "react-native";

function PlayOffs() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Starts on the 8th of April</Text>
    </View>
  );
}

export default PlayOffs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey_500,
  },
  text: {
    flex: 1,
    color: Colors.white,
  },
});
