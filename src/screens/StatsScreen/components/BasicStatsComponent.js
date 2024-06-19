import { StyleSheet, Text, View } from "react-native";
import React from "react";

const BasicStatsComponent = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.value}>{props.value}</Text>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

export default BasicStatsComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  value: {
    fontFamily: "K2D",
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
  },
  text: { fontFamily: "K2D", textAlign: "center", color: "#fff", fontSize: 15 },
});
