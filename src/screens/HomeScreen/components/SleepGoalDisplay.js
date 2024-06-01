import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const SleepGoalDisplay = () => {
  return (
    <TouchableOpacity className=" bg-blue-800 mt-1 border-2 border-gray-500 px-1 py-1 rounded-lg w-2/3">
      <Text className="text-center text-white">Today's Goal: 8 Hour</Text>
    </TouchableOpacity>
  );
};

export default SleepGoalDisplay;

const styles = StyleSheet.create({});
