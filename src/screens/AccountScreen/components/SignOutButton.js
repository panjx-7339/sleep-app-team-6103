import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { auth } from "../../../firebase/config";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const SignOutButton = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigation.replace("Login"))
      .catch((error) => alert(error.message));
  };

  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.button} onPress={handleSignOut}>
      <Text style={styles.text}>Sign out</Text>
    </TouchableOpacity>
  );
};

export default SignOutButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2C2C4D",
    fontFamily: "K2D",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 15,
    width: "100%",
  },
  text: {
    fontFamily: "K2DBold",
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
  },
});
