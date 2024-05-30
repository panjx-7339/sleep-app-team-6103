import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { firebase } from "../../../firebase/config";
import { useNavigation } from "@react-navigation/native";

const SignOutButton = () => {
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => navigation.replace("Login"))
      .catch((error) => alert(error.message));
  };

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="absolute top-28 m-1 right-0 w-1/3 bg-blue-200 mt-1 border-2 border-white p-1 rounded-lg"
      onPress={handleSignOut}
    >
      <Text className="text-center">Sign out</Text>
    </TouchableOpacity>
  );
};

export default SignOutButton;

const styles = StyleSheet.create({});
