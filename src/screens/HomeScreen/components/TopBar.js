import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Date from "./CurrentDate";
import SleepGoalDisplay from "./SleepGoalDisplay";
import PointsDisplay from "./PointsDisplay";
import CurrentDate from "./CurrentDate";

const TopBar = () => {
  return (
    <View className="flex-row h-24">
      <View className="w-2/3 flex-col justify-center">
        <CurrentDate />
        <SleepGoalDisplay />
      </View>
      <View className="w-1/3 flex-col justify-center items-center">
        <PointsDisplay />
      </View>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({});
