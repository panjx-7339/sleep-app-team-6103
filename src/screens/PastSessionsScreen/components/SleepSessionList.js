import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { db, auth } from "../../../firebase/config";
import Session from "./Session";

const SleepSessionList = () => {
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
  const getSessions = async () => {
    const querySnapshot = await userSessionsRef.get();
    const userSessions = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setSessions(userSessions);
  };
  useEffect(() => {
    getSessions();
  }, [uid]);

  return (
    <ScrollView className="w-full p-3">
      {sessions &&
        sessions.map((sess) => <Session start={sess.start} end={sess.end} />)}
    </ScrollView>
  );
};

export default SleepSessionList;

const styles = StyleSheet.create({});
