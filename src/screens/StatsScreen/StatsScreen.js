import {
  StyleSheet,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Graph from "./components/Graph";
import NavigationTab from "../../components/NavigationTab/NavigationTab";
import Background from "../../components/Background";
import { auth, db } from "../../firebase/config";
import BasicStats from "./components/BasicStats";
import Prediction from "./components/Prediction";
import { SafeAreaView } from "react-native-safe-area-context";

const StatsScreen = () => {
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

  useEffect(() => {
    if (!uid) return;

    const userSessionsRef = db
      .collection("users")
      .doc(uid)
      .collection("sessions");
    const userDocRef = db.collection("users").doc(uid);

    const getSessions = userSessionsRef
      .orderBy("start", "desc")
      .onSnapshot((querySnapshot) => {
        const userSessions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          start: doc.data().start.toDate(),
          end: doc.data().end.toDate(),
          durationInHours: doc.data().durationInHours,
        }));
        setSessions(userSessions);
      });

    const getGoal = userDocRef.onSnapshot((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        setGoal(userData.sleepGoal);
      }
    });

    return () => {
      getSessions();
      getGoal();
    };
  }, [uid]);
  return (
    <Background>
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.title}>Statistics</Text>
        </View>
        <View style={styles.container}>
          <BasicStats sessions={sessions} />
          <Graph sessions={sessions} />
          <Prediction sessions={sessions} goal={goal} />
        </View>
      </View>
      <NavigationTab />
    </Background>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  header: {
    paddingLeft: 20,
    paddingTop: 10,
  },
  title: {
    fontFamily: "K2D",
    color: "#fff",
    fontSize: 24,
  },
  main: {
    flex: 1,
    justifyContent: "flex-start",
  },
  container: {
    width: "90%",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "K2D",
    color: "#fff",
    fontSize: 24,
  },
});
