import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Title = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sleep Sessions</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
  text: {
    fontFamily: "K2D",
    color: "#fff",
    fontSize: 24,
  },
});
