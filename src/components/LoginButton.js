import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { firebase, auth } from "../firebase/config";

const LoginButton = (props) => {
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(props.email, props.password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.");
              return;
            }
            const user = firestoreDocument.data();
            navigation.navigate("Home", { user: user });
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => alert("Invalid email or password."));
  };

  const handleSignUp = () => {
    if (props.password !== props.confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(props.email, props.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
      })
      .catch((error) => alert(error.message));
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
