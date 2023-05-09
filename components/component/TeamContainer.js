import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Colors from "../UI/Colors";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

function TeamContainer({
  teamName,
  smallTeamName,
  teamLogo,
  isPressed,
  coach,
}) {
  const navigation = useNavigation();

  return (
    <Pressable
      style={[
        styles.teamContainer,
        ({ pressed }) => {
          pressed ? styles.buttonPressed : null;
        },
      ]}
      android_ripple={{ color: Colors.grey_200 }}
      onPress={() => {
        navigation.navigate("Team", {
          smallTeamName: smallTeamName,
          teamName: teamName,
          isPressed: isPressed,
          teamLogo: teamLogo,
        });
      }}
    >
      <View style={styles.teamDataContainer}>
        <Image source={{ uri: teamLogo }} style={styles.logoContainer} />
        <Text style={styles.text}>{teamName}</Text>
      </View>
    </Pressable>
  );
}

export default TeamContainer;

const styles = StyleSheet.create({
  teamContainer: {
    backgroundColor: Colors.grey_400,
    borderRadius: 10,
    padding: 20,
    width: "100%",
    marginVertical: 20,
  },
  text: {
    color: Colors.white,
    padding: 15,
    textAlign: "left",
  },
  teamDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoContainer: {
    height: 50,
    width: 50,
    borderRadius: 60,
  },
  star: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  buttonPressed: {
    opacity: 0.5,
  },
});
