import { StyleSheet, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import NavigationButton from "./NavigationButton";

const NavigationTab = () => {
  const iconSize = 27;
  const iconColor = "#949494";
  const home = <AntDesign name="home" size={iconSize} color={iconColor} />;
  const stats = (
    <Ionicons name="stats-chart-outline" size={iconSize} color={iconColor} />
  );
  const sessions = <AntDesign name="book" size={iconSize} color={iconColor} />;
  const shop = (
    <AntDesign name="shoppingcart" size={iconSize} color={iconColor} />
  );
  const account = (
    <MaterialCommunityIcons
      name="account-outline"
      size={iconSize}
      color={iconColor}
    />
  );

  return (
    <View style={styles.container}>
      <NavigationButton icon={home} name="Home" navigateTo="Home" />
      <NavigationButton icon={stats} name="Stats" navigateTo="Stats" />
      <NavigationButton
        icon={sessions}
        name="View Sessions"
        navigateTo="PastSessions"
      />
      <NavigationButton icon={shop} name="Shop" navigateTo="Shop" />
      <NavigationButton icon={account} name="Account" navigateTo="Account" />
    </View>
  );
};

export default NavigationTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
    width: "80%",
    position: "absolute",
    bottom: 10,
    padding: 10,
    alignSelf: "center",
    borderRadius: 30,
  },
});
