import { Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Faza1 from "../components/component/Faza1";
import Faza2 from "../components/component/Faza2";
import Colors from "../components/UI/Colors";
import PlayOffs from "../components/component/PlayOffs";
import PlayOut from "../components/component/PlayOut";

const Tab = createMaterialTopTabNavigator();

function StandingsContainer() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.beige_100,
        tabBarStyle: {
          backgroundColor: Colors.grey_500,
        },
        tabBarPressColor: Colors.grey_500,
        tabBarIndicatorStyle: {
          backgroundColor: Colors.yellow,
          height: 3,
        },
      }}
    >
      <Tab.Screen
        name="Faza1"
        component={Faza1}
        options={{
          title: "Faza 1",
        }}
      />
      <Tab.Screen
        name="Faza2"
        component={Faza2}
        options={{
          title: "Faza 2",
        }}
      />
      <Tab.Screen
        name="Playoffs"
        component={PlayOffs}
        options={{
          title: "Playoffs",
        }}
      />
      <Tab.Screen
        name="PlayOut"
        component={PlayOut}
        options={{
          title: "PlayOut",
        }}
      />
    </Tab.Navigator>
  );
}

export default StandingsContainer;
