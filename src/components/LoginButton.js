import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { auth, db } from "../firebase/config";
import { useNavigation } from "@react-navigation/native";

const LoginButton = (props) => {
  const navigation = useNavigation();
  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(props.email, props.password);
      navigation.navigate("Home");
    } catch (error) {
      alert("Invalid email or password.");
    }
  };

  const handleSignUp = async () => {
    try {
      if (props.password !== props.confirmPassword) {
        alert("Passwords entered do not match");
        return;
      }
      const userCredential = await auth.createUserWithEmailAndPassword(
        props.email,
        props.password
      );
      const userInfo = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      };
      await db.collection("users").doc(userCredential.user.uid).set(userInfo);
      navigation.navigate("Home");
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        alert("Email already in use");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <TouchableOpacity
      className="w-full bg-white mt-1 border-2 border-[#0782F9] p-4 rounded-lg flex items-center"
      onPress={props.type === "login" ? handleLogin : handleSignUp}
    >
      <Text className="text-center">
        {props.type === "login" ? "Login" : "Register"}
      </Text>
    </TouchableOpacity>
  );
};

export default LoginButton;

const styles = StyleSheet.create({});
