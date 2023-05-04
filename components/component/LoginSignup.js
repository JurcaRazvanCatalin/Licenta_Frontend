import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Colors from "../UI/Colors";
import ImageSvg from "react-native-remote-svg";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function LoginSignup() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.grey_500, padding: 20 }}>
      <View style={styles.container}>
        <ImageSvg
          source={require("../../assets/images/basketball_login.svg")}
          style={styles.img}
        />
      </View>
      <Text style={styles.loginText}>Login</Text>
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 2,
          borderBottomColor: Colors.grey_200,
          paddingBottom: 8,
          marginTop: 25,
        }}
      >
        <Ionicons
          size={20}
          name="at-outline"
          color={Colors.yellow}
          style={{ marginRight: 5 }}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor={Colors.grey_100}
          style={{ color: Colors.white }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 2,
          borderBottomColor: Colors.grey_200,
          paddingBottom: 8,
          marginTop: 20,
        }}
      >
        <Ionicons
          size={20}
          name="lock-closed-outline"
          color={Colors.yellow}
          style={{ marginRight: 5 }}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={Colors.grey_100}
          secureTextEntry={true}
          style={{ color: Colors.white }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("TabBottom", { screen: "Games" });
        }}
        style={styles.button}
      >
        <Text style={{ color: Colors.black, textAlign: "center" }}>Login</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          justifyContent: "center",
        }}
      >
        <Text style={{ color: Colors.grey_100, marginRight: 10 }}>
          New to the App?
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.replace("SignUp");
          }}
        >
          <Text style={{ color: Colors.yellow, fontWeight: "700" }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LoginSignup;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 80,
  },
  img: {
    height: 200,
    width: 200,
    marginTop: 20,
  },
  loginText: {
    color: Colors.white,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.yellow,
    padding: 20,
    borderRadius: 10,
    marginTop: 30,
  },
});
