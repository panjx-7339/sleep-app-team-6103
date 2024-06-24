import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NavigationTab from "../../components/NavigationTab/NavigationTab";
import Background from "../../components/Background";
import SignOutButton from "./components/SignOutButton";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const AccountScreen = () => {
  return (
    <LinearGradient
      colors={["#0B0B19", "#38387F"]}
      style={styles.linearGradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Account</Text>
          </View>
          <View style={styles.buttonContainer}>
            <SignOutButton />
          </View>
          <NavigationTab />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    width: "100%",
  },
  header: {
    paddingLeft: 30,
    paddingTop: 10,
  },
  title: {
    fontFamily: "K2D",
    color: "#fff",
    fontSize: 24,
  },
  buttonContainer: {
    flex: 1,
    paddingBottom: 90,
    marginTop: 10,
    width: "90%",
    alignSelf: "center",
  },
});
