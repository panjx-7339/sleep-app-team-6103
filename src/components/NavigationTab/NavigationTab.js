import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NavigationButton from "./NavigationButton";

const NavigationTab = () => {
  return (
    <View className="absolute bottom-0 flex-row flex-1">
      <NavigationButton name="Stats" navigateTo="Stats" />
      <NavigationButton name="Start Session" navigateTo="Sleep" />
      <NavigationButton name="View Past Sessions" navigateTo="Sleep" />
      <NavigationButton name="Shop" navigateTo="Shop" />
    </View>
  );
};

export default NavigationTab;

const styles = StyleSheet.create({});
