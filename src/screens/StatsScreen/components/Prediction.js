import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BasicStatsComponent from "./BasicStatsComponent";

const Prediction = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        You are most likely to miss your sleep goal on
      </Text>
      <Text style={styles.text}>Monday, Tuesday and Thursday</Text>
    </View>
  );
};

export default Prediction;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#6C6CB3",
    borderRadius: 20,
    marginTop: 15,
    paddingBottom: 15,
  },

  text: {
    fontFamily: "K2D",
    alignSelf: "flex-start",
    fontSize: 15,
    color: "#fff",
  },
});
