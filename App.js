import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import StandingsContainer from "./screens/StandingsContainer";
import MatchesContainer from "./screens/MatchesContainer";
import TeamsContainer from "./screens/TeamsContainer";
import StatisticsContainer from "./screens/StatisticsContainer.js";
import { Ionicons } from "@expo/vector-icons";
import Colors from "./components/UI/Colors";
import { StyleSheet } from "react-native";
import MatchStats from "./components/component/MatchStats";
import Player from "./components/component/Player";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.white,
        headerStyle: {
          backgroundColor: Colors.grey_500,
        },
        headerTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.beige_100,
        tabBarStyle: {
          backgroundColor: Colors.grey_400,
          position: "absolute",
          bottom: 15,
          height: 60,
          borderRadius: 15,
          right: 20,
          left: 20,
        },
        tabBarItemStyle: {
          marginBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="Games"
        component={MatchesContainer}
        options={{
          tabBarIcon: ({ size, color, focused }) => {
            return (
              <Ionicons
                name={focused ? "basketball" : "basketball-outline"}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="Standings"
        component={StandingsContainer}
        options={{
          tabBarIcon: ({ size, color }) => {
            return <Ionicons name="list-outline" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="Teams"
        component={TeamsContainer}
        options={{
          tabBarIcon: ({ size, color, focused }) => {
            return (
              <Ionicons
                name={focused ? "shirt" : "shirt-outline"}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="Statistics"
        component={StatisticsContainer}
        options={{
          tabBarIcon: ({ size, color, focused }) => {
            return (
              <Ionicons
                name={focused ? "cellular" : "cellular-outline"}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            contentStyle: {
              backgroundColor: Colors.grey_400,
            },
            headerStyle: {
              backgroundColor: Colors.grey_500,
            },
            headerTintColor: Colors.white,
          }}
        >
          <Stack.Screen
            name="TabBottom"
            component={TabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Match" component={MatchStats} />
          <Stack.Screen name="Player" component={Player} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey_300,
  },
});
