import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Session = (props) => {
  const start = props.start;
  const end = props.end;

  return (
    <View style={styles.container}>
      <Text>Start: {props.start}</Text>
      <Text>End: {props.end}</Text>
      <Text>Duration: {props.duration}</Text>
    </View>
  );
};

export default Session;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#6C6CB3",
    borderRadius: 20,
    marginTop: 10,
    paddingBottom: 15,
  },
});
