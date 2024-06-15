import {
  StyleSheet,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "./components/TopBar";
import Graph from "./components/Graph";

const StatsScreen = () => {
  return (
    <LinearGradient
      colors={["#6366f1", "#8b5cf6", "#ec4899"]}
      style={styles.linearGradient}
    >
      <SafeAreaView className="flex-1">
        <TopBar />
        <Graph />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
