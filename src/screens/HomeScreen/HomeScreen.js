import { StyleSheet, View } from "react-native";
import React from "react";
import Cat from "./components/Cat";
import TopBar from "./components/TopBar";
import NavigationTab from "../../components/NavigationTab/NavigationTab";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
  return (
    <LinearGradient
      colors={['#6366f1', '#8b5cf6', '#ec4899']}
      style={styles.linearGradient}
    >
      <SafeAreaView className="flex-1">
        <View className="h-full flex-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <TopBar />
          <View className="flex-1 justify-center items-center">
            <Cat />
          </View>
          <NavigationTab />
        </View>
      </SafeAreaView>
    </LinearGradient>

  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
});
