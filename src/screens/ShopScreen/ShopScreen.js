import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NavigationTab from "../../components/NavigationTab/NavigationTab";
import { SafeAreaView } from "react-native-safe-area-context";

const ShopScreen = () => {
  return (
    <SafeAreaView className="h-full">
      <Text>ShopScreen</Text>
      <NavigationTab />
    </SafeAreaView>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({});
