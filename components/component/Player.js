import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import Colors from "../UI/Colors";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

function Player({ route }) {
  const { playerName } = route.params;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${playerName}`,
      headerTitleStyle: {
        fontSize: 20,
        color: Colors.white,
      },
    });
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{playerName}</Text>
    </View>
  );
}

export default Player;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.white,
  },
});
