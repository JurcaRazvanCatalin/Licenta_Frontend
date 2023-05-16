import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../UI/Colors";
import ImageSvg from "react-native-remote-svg";
import { useNavigation } from "@react-navigation/native";
import AuthForm from "./AuthForm";
import { useState } from "react";

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    fullName: false,
    dateOfBirth: false,
  });

  function submitHandler(credentials) {
    let { email, fullName, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;
    const fullNameValid = fullName.length > 2;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!fullNameValid || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
        fullName: !fullNameValid,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

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
          source={require("../../../assets/images/basketball_login.svg")}
          style={styles.img}
        />
      </View>
      {isLogin ? (
        <Text style={styles.loginText}>Login</Text>
      ) : (
        <Text style={styles.loginText}>Sign Up</Text>
      )}
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      {isLogin ? (
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
      ) : (
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
            <Text style={{ color: Colors.yellow, fontWeight: "700" }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default AuthContent;

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
