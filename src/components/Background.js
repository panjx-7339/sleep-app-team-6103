import { StyleSheet, KeyboardAvoidingView, Platform, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const Background = ({ children }) => {
  return (
    <LinearGradient
      colors={["#0B0B19", "#38387F"]}
      style={styles.linearGradient}
    >
      <SafeAreaView>
        <View style={styles.container}>{children}</View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    alignSelf: "stretch",
  },
  linearGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
