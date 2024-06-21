import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { React, useState, useEffect } from "react";
import Cat from "./components/Cat";
import TopBar from "./components/TopBar";
import NavigationTab from "../../components/NavigationTab/NavigationTab";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "../../firebase/config";
import StopwatchButton from "./components/StopwatchButton";
import Background from "../../components/Background";

const HomeScreen = () => {
  const [uid, setUid] = useState();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <LinearGradient
      colors={["#0B0B19", "#6C6CB3"]}
      style={styles.linearGradient}
      locations={[0, 0.7]}
    >
      <SafeAreaView>
        <View className="h-full flex-1">
          <TopBar />
          <Cat />
          <NavigationTab />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  linearGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
