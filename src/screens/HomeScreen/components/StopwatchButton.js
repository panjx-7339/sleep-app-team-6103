import { View, StyleSheet, Text, TouchableOpacity, useState } from "react-native";
import React from "react";

const StopwatchButton = (props) => {
  return (
  <View className="flex-1 items-center">
    <TouchableOpacity
      className="bg-white border-black rounded-full w-1/5 h-12 border-2 px-4 py-2 justify-center"
      onPress={() => console.log("Button pressed")}
    >
      <Text className="text-center text-black">{props.name}</Text>
    </TouchableOpacity>
  </View>
  );
};

export default StopwatchButton;

const styles = StyleSheet.create({});