import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const NavigationButton = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="justify-center h-24 w-1/3 bg-blue-800 border-2 border-gray-500"
      onPress={() => navigation.navigate(props.navigateTo)}
    >
      <Text className="text-center color-white text-xl">{props.name}</Text>
    </TouchableOpacity>
  );
};

export default NavigationButton;

const styles = StyleSheet.create({});
