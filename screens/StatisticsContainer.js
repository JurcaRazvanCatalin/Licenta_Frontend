import { Text, View, StyleSheet } from "react-native";

function StatisticsContainer() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Statistics Container</Text>
    </View>
  );
}

export default StatisticsContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey_500,
  },
  text: {
    color: Colors.white,
  },
});
