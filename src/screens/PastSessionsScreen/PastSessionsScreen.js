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

const PastSessionsScreen = () => {
  return (
    <KeyboardAvoidingView
      className="h-screen flex items-center justify-center"
      behavior={Platform.OS === "android" ? "height" : "padding"}
    >
      <LinearGradient
        colors={["#6366f1", "#8b5cf6", "#ec4899"]}
        style={styles.linearGradient}
      >
        <TopBar />
        <AddSleepSession />
        <SleepSessionList />
      </LinearGradient>
    </KeyboardAvoidingView>
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
