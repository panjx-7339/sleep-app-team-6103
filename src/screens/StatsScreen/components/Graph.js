import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { auth, db } from "../../../firebase/config";
import { useState, useEffect } from "react";
import { BarChart } from "react-native-chart-kit";

const Graph = () => {
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

  const [sessions, setSessions] = useState();

  const initializeSessions = async () => {
    const querySnapshot = await userSessionsRef.orderBy("start", "desc").get();

    const userSessions = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      start: doc.data().start.toDate(),
      end: doc.data().end.toDate(),
      durationInHours: doc.data().durationInHours,
    }));
    setSessions(userSessions);
  };
  useEffect(() => {
    initializeSessions();
  }, [uid]);

  const processData = () => {};

  return <View></View>;
};

export default Graph;

const styles = StyleSheet.create({});
