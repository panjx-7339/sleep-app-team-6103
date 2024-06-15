import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ReturnToHome = () => {
  const navigation = useNavigation();
  const text = "< Home";
  return (
    <TouchableOpacity className="" onPress={() => navigation.navigate("Home")}>
      <Text className="">{text}</Text>
    </TouchableOpacity>
  );
};

export default ReturnToHome;

const styles = StyleSheet.create({});
