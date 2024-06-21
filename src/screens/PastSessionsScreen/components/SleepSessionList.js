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
  const [init, setInit] = useState(false);

  const initializeSessions = async () => {
    if (uid) {
      if (!init) {
        const querySnapshot = await userSessionsRef
          .orderBy("start", "desc")
          .get();
        const userSessions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          start: doc.data().start.toDate(),
          end: doc.data().end.toDate(),
          durationInHours: doc.data().durationInHours,
          startString: formatString(doc.data().start.toDate()),
          endString: formatString(doc.data().end.toDate()),
        }));
        setSessions(userSessions);
        setInit(true);
      } else {
        userSessionsRef.orderBy("start", "desc").onSnapshot((querySnapshot) => {
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
      }
    }
  };

  useEffect(() => {
    initializeSessions();
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
