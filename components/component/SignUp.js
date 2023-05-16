import { createUser } from "../../util/auth";
import AuthContent from "./Auth/AuthContent";
import { useContext, useState } from "react";
import LoadingOverlay from "../UI/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../context/auth-context";

function LoginSignup() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signUpHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (err) {
      Alert.alert(
        "Authentication failed!",
        "Could not create user. Please check your input and try again later."
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default LoginSignup;
