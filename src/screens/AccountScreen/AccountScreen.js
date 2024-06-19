import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationTab from "../../components/NavigationTab/NavigationTab";
import Background from "../../components/Background";

const AccountScreen = () => {
  return (
    <Background>
      <Text>AccountScreen</Text>
      <NavigationTab />
    </Background>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
