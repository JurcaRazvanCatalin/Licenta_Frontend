import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Input,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../UI/Colors";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredFullName, setEnteredFullName] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [enteredDateOfBirth, setEnteredDateOfBirth] = useState("");

  const navigation = useNavigation();

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "full_name":
        setEnteredFullName(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
      case "dateOfBirth":
        setEnteredDateOfBirth(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      fullName: enteredFullName,
      dateOfBirth: enteredDateOfBirth,
    });
  }

  return (
    <>
      {!isLogin && (
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
            onChangeText={updateInputValueHandler.bind(this, "full_name")}
            value={enteredFullName}
          />
        </View>
      )}
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
          onChangeText={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
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
          onChangeText={updateInputValueHandler.bind(this, "password")}
          value={enteredPassword}
        />
      </View>
      {!isLogin && (
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
              onChangeText={updateInputValueHandler.bind(
                this,
                "confirmPassword"
              )}
              value={enteredConfirmPassword}
            />
          </View>
        </View>
      )}
      {!isLogin && (
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
              onChangeText={updateInputValueHandler.bind(this, "dateOfBirth")}
              value={enteredDateOfBirth}
            />
          </View>
        </View>
      )}
      {isLogin ? (
        <TouchableOpacity onPress={submitHandler} style={styles.button}>
          <Text style={{ color: Colors.black, textAlign: "center" }}>
            Login
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={submitHandler} style={styles.button}>
          <Text style={{ color: Colors.black, textAlign: "center" }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
}

export default AuthForm;

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
