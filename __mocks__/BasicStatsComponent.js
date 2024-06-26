import React from "react";
import { Text, View } from "react-native";

const BasicStatsComponent = ({ text, value }) => (
  <View>
    <Text>{`${text}: ${value}`}</Text>
  </View>
);

export default BasicStatsComponent;
