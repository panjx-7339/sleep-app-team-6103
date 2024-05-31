import { StyleSheet, View } from "react-native";
import React from "react";
import Cat from "./components/Cat";
import TopBar from "./components/TopBar";
import NavigationTab from "../../components/NavigationTab/NavigationTab";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <SafeAreaView className="bg-blue-100 flex-1">
      <View className="h-full flex-1 bg-blue-100">
        <TopBar />
        <View className="justify-center items-center">
          <Cat />
        </View>
        <NavigationTab />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
