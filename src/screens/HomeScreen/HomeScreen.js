import { StyleSheet, View } from "react-native";
import React from "react";
import SignOutButton from "./components/SignOutButton";
import Cat from "./components/Cat";

const HomeScreen = () => {
  return (
    <View className="h-full before:bg-blue-100">
      <SignOutButton />
      <Cat />
      {/*<SleepGoalBar /> 
      <Cat />
      <NavigationBar />        */}
      <Cat />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
