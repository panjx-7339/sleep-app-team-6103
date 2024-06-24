import { StyleSheet, ImageBackground, View } from "react-native";
import { React, useState, useEffect } from "react";
import Cat from "./components/Cat";
import TopBar from "./components/TopBar";
import NavigationTab from "../../components/NavigationTab/NavigationTab";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { auth, db } from "../../firebase/config";
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

  const userSessionsRef = db
    .collection("users")
    .doc(uid)
    .collection("sessions");
  const userDocRef = db.collection("users").doc(uid);

  const [sessions, setSessions] = useState();
  const [goal, setGoal] = useState();

  const initializeSessions = async () => {
    if (uid) {
      const querySnapshot = await userSessionsRef
        .orderBy("start", "desc")
        .get();
      const userSessions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        start: doc.data().start.toDate(),
        end: doc.data().end.toDate(),
        durationInHours: doc.data().durationInHours,
      }));
      setSessions(userSessions);
      const userDoc = await userDocRef.get();
      const userData = userDoc.data();
      setGoal(userData.sleepGoal);
    }
  };
  useEffect(() => {
    initializeSessions();
  }, [uid]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/background.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <SafeAreaView style={styles.container}>
          <View className="h-full w-full flex-1">
            <TopBar />
            <Cat sessions={sessions} goal={goal} />
            <NavigationTab />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
