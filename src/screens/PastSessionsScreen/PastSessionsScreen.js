import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SleepSessionList from "./components/SleepSessionList";
import AddSleepSession from "./components/AddSleepSession";
import NavigationTab from "../../components/NavigationTab/NavigationTab";
import Background from "../../components/Background";

const PastSessionsScreen = () => {
  return (
    <Background>
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.title}>Past Sessions</Text>
        </View>
        <View style={styles.container}>
          <AddSleepSession />
        </View>
        <View style={styles.scrollView}>
          <SleepSessionList />
        </View>
      </View>
      <NavigationTab />
    </Background>
  );
};

export default PastSessionsScreen;

const styles = StyleSheet.create({
  header: {
    paddingLeft: 20,
    paddingTop: 10,
  },
  title: {
    fontFamily: "K2D",
    color: "#fff",
    fontSize: 24,
  },
  main: {
    flex: 1,
    justifyContent: "flex-start",
  },
  container: {
    width: "90%",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "K2D",
    color: "#fff",
    fontSize: 24,
  },
  scrollView: {
    flex: 1,
    paddingBottom: 90,
    marginTop: 10,
  },
});
