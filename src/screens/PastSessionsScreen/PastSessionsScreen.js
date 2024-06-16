import {
  StyleSheet,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import TopBar from "./components/TopBar";
import SleepSessionList from "./components/SleepSessionList";
import AddSleepSession from "./components/AddSleepSession";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationTab from "../../components/NavigationTab/NavigationTab";

const PastSessionsScreen = () => {
  return (
    <LinearGradient
      colors={["#6366f1", "#8b5cf6", "#ec4899"]}
      style={styles.linearGradient}
    >
      <SafeAreaView className="flex-1">
        <View className="h-full flex-1 justify-center ">
          <TopBar />
          <AddSleepSession />
          <SleepSessionList />
          <NavigationTab />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default PastSessionsScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
