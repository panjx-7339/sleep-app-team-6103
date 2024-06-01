import { KeyboardAvoidingView, StyleSheet, View, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../../firebase/config";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../components/Logo";
import LoginInput from "../../components/LoginInput";
import LoginButton from "../../components/LoginButton";
import Redirect from "../../components/Redirect";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  //auth listener
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <KeyboardAvoidingView
      className="h-screen flex items-center justify-center bg-blue-200"
      behavior={Platform.OS === "android" ? "height" : "padding"}
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
      </View>

      <View className="w-3/5 flex justify-center items-center mt-10">
        <LoginButton type="login" email={email} password={password} />
        <Redirect
          string="New to this app? Create an account here."
          redirectTo="Registration"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
