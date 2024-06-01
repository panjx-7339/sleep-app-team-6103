import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Redirect = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="w-full p-2 flex items-center"
      onPress={() => navigation.navigate(props.redirectTo)}
    >
      <Text className="text-center text-s underline">{props.string} </Text>
    </TouchableOpacity>
  );
};

export default Redirect;

const styles = StyleSheet.create({});
