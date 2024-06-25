import { StyleSheet, View } from "react-native";
import React from "react";
import CurrentDate from "./CurrentDate";
import SleepGoalDisplay from "./SleepGoalDisplay";

const TopBar = () => {
  return (
    <View style={styles.main}>
      <View style={styles.dateContainer}>
        <CurrentDate />
      </View>
      <View style={styles.goalContainer}>
        <SleepGoalDisplay />
      </View>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    height: 100,
  },
  dateContainer: {
    flex: 1,
    width: "50%",
    alignItems: "flex-start",
  },
  goalContainer: {
    flex: 1,
  },
});
