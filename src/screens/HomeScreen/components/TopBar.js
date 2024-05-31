import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SignOutButton from "./SignOutButton";
import Date from "./Date";
import SleepGoalDisplay from "./SleepGoalDisplay";
import PointsDisplay from "./PointsDisplay";

const TopBar = () => {
  return (
    <View className="flex-row h-24">
      <View className="w-2/3 flex-col justify-center">
        <Date />
        <SleepGoalDisplay />
      </View>
      <View className="w-1/3 flex-col justify-center items-center">
        <SignOutButton />
        <PointsDisplay />
      </View>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({});
