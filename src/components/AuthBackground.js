import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthBackground = ({ children }) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "android" ? "height" : "padding"}
    >
      <LinearGradient
        colors={["#0B0B19", "#6C6CB3"]}
        style={styles.linearGradient}
        locations={[0, 0.7]}
      >
        <SafeAreaView style={styles.container}>{children}</SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default AuthBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  linearGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
