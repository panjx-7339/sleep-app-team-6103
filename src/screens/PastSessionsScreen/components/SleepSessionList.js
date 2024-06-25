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

  const [sessions, setSessions] = useState();

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
          startString: formatString(doc.data().start.toDate()),
          endString: formatString(doc.data().end.toDate()),
        }));
        setSessions(userSessions);
      });

    return () => {
      getSessions();
    };
  }, [uid]);

  const formatString = (date) => {
    return date.toString();
  };

  return (
    <View>
      <ScrollView>
        {sessions &&
          sessions.map((sess) => (
            <Session
              key={sess.id}
              start={sess.startString}
              end={sess.endString}
              duration={sess.durationInHours}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default SleepSessionList;

const styles = StyleSheet.create({});
