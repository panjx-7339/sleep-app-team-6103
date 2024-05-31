import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NavigationButton from "./NavigationButton";

const NavigationTab = () => {
  return (
    <View className="absolute bottom-0 flex-row flex-1">
      <NavigationButton name="stats" navigateTo="Stats" />
      <NavigationButton name="sleep" navigateTo="Sleep" />
      <NavigationButton name="shop" navigateTo="Shop" />
    </View>
  );
};

export default NavigationTab;

const styles = StyleSheet.create({});
