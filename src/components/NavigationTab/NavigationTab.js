import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NavigationButton from "./NavigationButton";

const NavigationTab = () => {
  return (
    <View className="absolute bottom-0 flex-row flex-1">
      <NavigationButton name="Home" navigateTo="Home" />
      <NavigationButton name="Stats" navigateTo="Stats" />
      <NavigationButton name="View Sessions" navigateTo="PastSessions" />
      <NavigationButton name="Shop" navigateTo="Shop" />
      <NavigationButton name="Account" navigateTo="Account" />
    </View>
  );
};

export default NavigationTab;

const styles = StyleSheet.create({});
