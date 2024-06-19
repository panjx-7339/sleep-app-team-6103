import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NavigationButton from "./NavigationButton";

const NavigationTab = () => {
  return (
    <View style={styles.container}>
      <NavigationButton name="Home" navigateTo="Home" />
      <NavigationButton name="Stats" navigateTo="Stats" />
      <NavigationButton name="View Sessions" navigateTo="PastSessions" />
      <NavigationButton name="Shop" navigateTo="Shop" />
      <NavigationButton name="Account" navigateTo="Account" />
    </View>
  );
};

export default NavigationTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around", // Distribute buttons evenly
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
});
