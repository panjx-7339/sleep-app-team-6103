import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";

const FontLoader = ({ children }) => {
  let [fontsLoaded, fontError] = useFonts({
    K2D: require("../../assets/fonts/K2D.ttf"),
    K2DBold: require("../../assets/fonts/K2DBold.ttf"),
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return children;
};

export default FontLoader;

const styles = StyleSheet.create({});
