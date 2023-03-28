import { StyleSheet, Text, View } from "react-native";
import Calendar from "../components/component/Calendar";
import { useState } from "react";
import data from "../data";

function MatchesContainer() {
  return (
    <View style={styles.container}>
      <Calendar />
    </View>
  );
}

export default MatchesContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey_500,
  },
});
