import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationTab from "../../components/NavigationTab/NavigationTab";

const AccountScreen = () => {
  return (
    <SafeAreaView className="h-full">
      <Text>AccountScreen</Text>
      <NavigationTab />
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
