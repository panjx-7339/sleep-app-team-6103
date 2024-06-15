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
import ForgotPasswordButton from "../../components/ForgotPasswordButton";
import LoginButton from "../../components/LoginButton";
import Redirect from "../../components/Redirect";
import { LinearGradient } from "expo-linear-gradient";

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
    <KeyboardAvoidingView
      className="h-screen flex items-center justify-center"
      behavior={Platform.OS === "android" ? "height" : "padding"}
    >
      <LinearGradient
        colors={["#6366f1", "#8b5cf6", "#ec4899"]}
        style={styles.linearGradient}
      >
        <View>
          <Logo />
        </View>

        <View className="w-4/5">
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

        <View className="w-3/5 flex justify-center items-center mt-10">
          <LoginButton type="login" email={email} password={password} />
          <Redirect
            string="New to this app? Create an account here."
            redirectTo="Registration"
          />
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
