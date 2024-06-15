import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen/RegistrationScreen";
import ShopScreen from "./src/screens/ShopScreen/ShopScreen";
import PastSessionsScreen from "./src/screens/PastSessionsScreen/PastSessionsScreen";
import StatsScreen from "./src/screens/StatsScreen/StatsScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="Shop" component={ShopScreen} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="PastSessions"
          component={PastSessionsScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Stats"
          component={StatsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
