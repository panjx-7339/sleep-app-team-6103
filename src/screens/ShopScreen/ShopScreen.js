import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import NavigationTab from "../../components/NavigationTab/NavigationTab";
import ShopList from "./components/ShopList";
import PointsDisplay from "./components/PointsDisplay";

const ShopScreen = () => {
  return (
    <LinearGradient
      colors={["#0B0B19", "#38387F"]}
      style={styles.linearGradient}
    >
      <SafeAreaView style={styles.main}>
        <View style={styles.main}>
          <View style={styles.header}>
            <Text style={styles.title}>Shop</Text>
            <PointsDisplay />
          </View>
          <View style={styles.scrollView}>
            <ShopList />
          </View>
          <NavigationTab />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    width: "100%",
  },
  main: {
    flex: 1,
    width: "100%",
  },
  header: {
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "K2D",
    color: "#fff",
    fontSize: 24,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#1D3573",
    marginTop: 10,
    marginBottom: 90,
    marginHorizontal: 20,
  },
});
