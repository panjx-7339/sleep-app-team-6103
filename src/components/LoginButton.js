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
      switch (error.code) {
        case ("auth/invalid-email"):
          alert("Invalid email provided");
          break;
        case ("auth/missing-password"):
          alert("Missing password");
          break;
        case ("auth/invalid-credential"):
          alert("Invalid credentials");
          break;
        default:
          alert(error.code);
          break;
      }
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
      switch (error.code) {
        case "auth/invalid-email":
          alert("Invalid email provided");
          break;
        case "auth/weak-password":
          alert("Invalid password provided, should be at least 6 characters");
          break;
        case "auth/email-already-in-use":
          alert("Email is already is use");
          break;
        default:
          alert(error.message);
          break;
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
