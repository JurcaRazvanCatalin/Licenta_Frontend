import { Text, View, StyleSheet } from "react-native";
import Colors from "../UI/Colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTeam from "./HomeTeam";
import AwayTeam from "./AwayTeam";

const Tab = createBottomTabNavigator();

function MatchData() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.grey_400,
          position: "absolute",
          bottom: 15,
          height: 30,
          borderRadius: 15,
          right: 20,
          left: 20,
        },
        tabBarItemStyle: {
          marginBottom: 5,
        },
        tabBarInactiveTintColor: Colors.beige_100,
        tabBarActiveTintColor: Colors.white,
        tabBarLabelStyle: {
          fontSize: 16,
        },
      }}
    >
      <Tab.Screen
        name="Echipa1"
        component={HomeTeam}
        options={{
          title: "Home Team",
          tabBarIcon: ({ focused, color, size }) => null,
        }}
      />
      <Tab.Screen
        name="Echipa2"
        component={AwayTeam}
        options={{
          title: "Away Team",
          tabBarIcon: ({ focused, color, size }) => null,
        }}
      />
    </Tab.Navigator>
  );
}

export default MatchData;
