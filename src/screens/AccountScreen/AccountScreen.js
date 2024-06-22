import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NavigationTab from "../../components/NavigationTab/NavigationTab";
import Background from "../../components/Background";
import SignOutButton from "./components/SignOutButton";

const AccountScreen = () => {
  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Account</Text>
        </View>
        <View style={styles.buttonContainer}>
          <SignOutButton />
        </View>
      </View>
      <NavigationTab />
    </Background>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "K2D",
    color: "#fff",
    fontSize: 24,
  },
  buttonContainer: {
    flex: 13,
    justifyContent: "center",
    alignItems: "center",
  },
});
