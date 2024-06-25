import { StyleSheet, Text, View } from "react-native";
import React from "react";

import ReturnToHome from "../../../components/ReturnToHome";

const TopBar = () => {
  return (
    <View className="w-full h-11  flex flex-row items-center justify-between px-4">
      <ReturnToHome />
      <Text className="text-center text-xl">Stats</Text>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({});
