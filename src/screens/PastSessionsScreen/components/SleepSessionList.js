import { StyleSheet, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { db, auth } from "../../../firebase/config";
import Session from "./Session";
import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const SleepSessionList = () => {
  const user = auth.currentUser;
  const uid = user.uid;

  const [sessions, setSessions] = useState();

  useEffect(() => {
    if (!uid) return;
    const userSessionsRef = collection(db, "users", uid, "sessions");
    const userDocRef = doc(db, "users", uid);

    const getSessions = onSnapshot(
      query(userSessionsRef, orderBy("start", "desc")),
      (querySnapshot) => {
        const userSessions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          start: doc.data().start.toDate(),
          end: doc.data().end.toDate(),
          durationInHours: doc.data().durationInHours,
          startString: formatString(doc.data().start.toDate()),
          endString: formatString(doc.data().end.toDate()),
        }));
        setSessions(userSessions);
      }
    );

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
              sessId={sess.id}
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
