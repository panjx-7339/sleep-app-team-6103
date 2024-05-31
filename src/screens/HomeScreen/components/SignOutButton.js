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
      className=" bg-blue-200 mt-1 border-2 border-white px-9 py-1 rounded-lg"
      onPress={handleSignOut}
    >
      <Text className="text-center">Sign out</Text>
    </TouchableOpacity>
  );
};

export default SignOutButton;

const styles = StyleSheet.create({});
