import {
  StyleSheet,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import TopBar from "./components/TopBar";
import SleepSessionList from "./components/SleepSessionList";
import AddSleepSession from "./components/AddSleepSession";
import NavigationTab from "../../components/NavigationTab/NavigationTab";
import Background from "../../components/Background";

const PastSessionsScreen = () => {
  return (
    <Background>
      <View className="h-full flex-1 justify-center ">
        <TopBar />
        <AddSleepSession />
        <SleepSessionList />
        <NavigationTab />
      </View>
    </Background>
  );
};

export default PastSessionsScreen;

const styles = StyleSheet.create({});
