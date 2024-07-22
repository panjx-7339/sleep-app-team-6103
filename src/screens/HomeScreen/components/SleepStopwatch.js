import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Stopwatch } from "react-native-stopwatch-timer";
import { FontAwesome } from "@expo/vector-icons";
import { auth, db } from "../../../firebase/config";

const SleepStopwatch = () => {
  //start time, used to create new session
  const [startTime, setStartTime] = useState(null);
  //tracks whether stopwatch is currently running
  const [isRunning, setIsRunning] = useState(false);
  //resets stopwatch to 00:00:00, when stopwatch is stopped
  const [reset, setReset] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);

  const user = auth.currentUser;
  const uid = user.uid;

  const userSessionsRef = db
    .collection("users")
    .doc(uid)
    .collection("sessions");
  const userDocRef = db.collection("users").doc(uid);

  const [data, setData] = useState();

  useEffect(() => {
    if (!uid) return;
    const userDocRef = db.collection("users").doc(uid);
    const getData = userDocRef.onSnapshot((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        setData(userData);
        setIsRunning(userData.isSleeping);
        const start = userData.start.toDate();
        setStartTime(start);
        const current = new Date() - start;
        setCurrentTime(current);
      }
    });
    return () => {
      getData();
    };
  }, [uid]);

  //design of icon
  const iconSize = 40;
  const startColor = "#50FF8B";
  const stopColor = "#FF5C5C";

  const startButton = (
    <FontAwesome name="play-circle" size={iconSize} color={startColor} />
  );
  const stopButton = (
    <FontAwesome name="stop-circle" size={iconSize} color={stopColor} />
  );

  const icon = isRunning ? stopButton : startButton;

  //add session
  const addSession = async (start, end) => {
    const durationInHours = (end - start) / (1000 * 60 * 60);
    if (durationInHours < 0) {
      alert("Start time should be before end time.");
      return;
    } else if (durationInHours >= 24) {
      alert("Sleep Session cannot be longer than 24 hours.");
      return;
    }
    const userDoc = await userDocRef.get();
    const userData = userDoc.data();
    const goal = userData.sleepGoal;

    let points = 0;
    points = durationInHours >= goal ? 15 : 5;
    const metGoal = durationInHours >= goal;

    const docRef = await userSessionsRef.add({
      start: start,
      end: end,
      durationInHours: durationInHours,
      points: points,
      metGoal: metGoal,
    });

    const currentPoints = userData.points;
    const updatedPoints = currentPoints + points;
    await userDocRef
      .update({
        points: updatedPoints,
      })
      .then(() => {
        console.log("Points successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating points: ", error);
      });

    console.log("Document written with ID: ", docRef.id);
  };

  const handlePress = async () => {
    if (isRunning) {
      // press stop - set stop time, create new session, toggle cat sleeping
      setIsRunning(false);
      setReset(true);
      const update = await userDocRef.update({
        isSleeping: false,
      });
      console.log(startTime, new Date());
      setCurrentTime(0);

      addSession(startTime, new Date());
    } else {
      //press start - set start, toggle cat sleeping
      setIsRunning(true);
      setStartTime(new Date());
      const update = await userDocRef.update({
        isSleeping: true,
        start: new Date(),
      });
    }
  };

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);

  return (
    <View style={styles.container}>
      <Stopwatch start={isRunning} reset={reset} startTime={currentTime} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePress}>{icon}</TouchableOpacity>
      </View>
    </View>
  );
};

export default SleepStopwatch;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
});
