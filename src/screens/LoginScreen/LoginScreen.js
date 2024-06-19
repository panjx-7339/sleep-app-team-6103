import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../components/Logo";
import LoginInput from "../../components/LoginInput";
import ForgotPasswordButton from "./components/ForgotPasswordButton";
import LoginButton from "../../components/LoginButton";
import Redirect from "../../components/Redirect";
import AuthBackground from "../../components/AuthBackground";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  //auth listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("signed in");
        navigation.navigate("Home");
      } else {
        console.log("signed out");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthBackground>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>

        <View style={styles.inputContainer}>
          <LoginInput
            string="Email"
            value={email}
            setValue={setEmail}
            isSecure={false}
          />
          <LoginInput
            string="Password"
            value={password}
            setValue={setPassword}
            isSecure={true}
          />
          <ForgotPasswordButton email={email} />
        </View>

        <View style={styles.buttonContainer}>
          <LoginButton type="login" email={email} password={password} />
          <Redirect
            string="New to this app? Create an account here."
            redirectTo="Registration"
          />
        </View>
      </View>
    </AuthBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "80%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  inputContainer: {
    width: "80%",
  },
  logoContainer: {
    marginBottom: 50,
    alignItems: "center",
  },
});
