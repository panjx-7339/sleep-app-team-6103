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

const PastSessionsScreen = () => {
  return (
    <LinearGradient
      colors={["#6366f1", "#8b5cf6", "#ec4899"]}
      style={styles.linearGradient}
    >
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          className="h-screen flex items-center justify-center"
          behavior={Platform.OS === "android" ? "height" : "padding"}
        >
          <TopBar />
          <AddSleepSession />
          <SleepSessionList />
        </KeyboardAvoidingView>
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
