import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NavigationTab from "../../components/NavigationTab/NavigationTab";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../../components/Background";

const ShopScreen = () => {
  return (
    <Background>
      <SafeAreaView style={{ flex: 1 }}>
        <Text>ShopScreen</Text>
        <NavigationTab />
      </SafeAreaView>
    </Background>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({});
