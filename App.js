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
import MatchStats from "./components/component/MatchStats";
import Player from "./components/component/Player";
import Team from "./components/component/Team";
import LoginSignup from "./components/component/LoginSignup";
import SignUp from "./components/component/SignUp";
import AccountScreen from "./screens/AccountScreen";
import AuthContextProvider, {
  AuthContext,
} from "./components/context/auth-context";
import { useContext } from "react";

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
          height: 60,
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
      <Tabs.Screen
        name="Favorites"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ size, color, focused }) => {
            return (
              <Ionicons
                name={focused ? "star" : "star-outline"}
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

const AuthStack = () => {
  return (
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
        name="SignIn"
        component={LoginSignup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AuthenticatedStack = () => {
  return (
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
      <Stack.Screen name="TabBottom" component={TabNavigator} />
      <Stack.Screen name="Match" component={MatchStats} />
      <Stack.Screen name="Player" component={Player} />
      <Stack.Screen name="Team" component={Team} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}
