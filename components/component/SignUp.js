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
import DatePicker from "react-native-date-picker";
// import { createUser } from "../../util/auth";

function LoginSignup() {
  const navigation = useNavigation();

  // function signUpHandler(){
  //   createUser()
  // }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.grey_500,
        paddingHorizontal: 20,
      }}
    >
      <View style={styles.container}>
        <ImageSvg
          source={require("../../assets/images/basketball_login.svg")}
          style={styles.img}
        />
      </View>
      <Text style={styles.loginText}>Sign Up</Text>
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
          name="person-outline"
          color={Colors.yellow}
          style={{ marginRight: 5 }}
        />
        <TextInput
          placeholder="Full Name"
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={Colors.grey_100}
            secureTextEntry={true}
            style={{ color: Colors.white }}
          />
        </View>
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
          name="calendar-outline"
          color={Colors.yellow}
          style={{ marginRight: 5 }}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            placeholder="Date of Birth"
            placeholderTextColor={Colors.grey_100}
            secureTextEntry={true}
            style={{ color: Colors.white }}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("TabBottom", { screen: "Games" });
        }}
        style={styles.button}
      >
        <Text style={{ color: Colors.black, textAlign: "center" }}>
          Sign Up
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          justifyContent: "center",
        }}
      >
        <Text style={{ color: Colors.grey_100, marginRight: 10 }}>
          Already having an Account?
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.replace("SignIn");
          }}
        >
          <Text style={{ color: Colors.yellow, fontWeight: "700" }}>Login</Text>
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
