import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AddSleepSession from "./AddSleepSession";

const TopBar = () => {
  return (
    <View className="w-full h-11 border-2 border-black flex flex-row items-center justify-between px-4">
      <Text className="flex-1 text-left text-xl">Sleep Sessions</Text>
      <AddSleepSession className="flex-none" />
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({});
