import {
  StyleSheet,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "./components/TopBar";
import Graph from "./components/Graph";
import NavigationTab from "../../components/NavigationTab/NavigationTab";
import Background from "../../components/Background";

const StatsScreen = () => {
  return (
    <Background>
      <TopBar />
      <Graph />
      <NavigationTab />
    </Background>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({});
