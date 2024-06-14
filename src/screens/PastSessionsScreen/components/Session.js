import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Session = (props) => {
  return (
    <View className="border-2 border-black w-full">
      <Text>Start: {props.start}</Text>
      <Text>End: {props.end}</Text>
    </View>
  );
};

export default Session;

const styles = StyleSheet.create({});
