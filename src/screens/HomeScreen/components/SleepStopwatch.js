import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Stopwatch } from "react-native-stopwatch-timer";
import { FontAwesome } from "@expo/vector-icons";
import { auth, db } from "../../../firebase/config";
import { collection, doc, addDoc, updateDoc, getDoc } from "firebase/firestore";

const SleepStopwatch = () => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [reset, setReset] = useState(false);

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

  const user = auth.currentUser;
  const uid = user.uid;

  const userSessionsRef = collection(db, "users", uid, "sessions");
  const userDocRef = doc(db, "users", uid);

  const addSession = async (start, end) => {
    const durationInHours = (end - start) / (1000 * 60 * 60);
    if (durationInHours < 0) {
      alert("Start time should be before end time.");
      return;
    } else if (durationInHours >= 24) {
      alert("Sleep Session cannot be longer than 24 hours.");
      return;
    }
    const userDoc = await getDoc(userDocRef);
    const userData = userDoc.data();
    const goal = userData.sleepGoal;

    let points = 0;
    points = durationInHours >= goal ? 15 : 5;
    const metGoal = durationInHours >= goal;

    const docRef = await addDoc(userSessionsRef, {
      start: start,
      end: end,
      durationInHours: durationInHours,
      points: points,
      metGoal: metGoal,
    });

    const currentPoints = userData.points;
    const updatedPoints = currentPoints + points;
    await updateDoc(userDocRef, {
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
      setEndTime(new Date());
      setIsRunning(false);
      setReset(true);
      await updateDoc(userDocRef, {
        isSleeping: false,
      });

      addSession(startTime, new Date());
    } else {
      //press start - set start, toggle cat sleeping
      setIsRunning(true);
      setStartTime(new Date());
      await updateDoc(userDocRef, {
        isSleeping: true,
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
      <Stopwatch start={isRunning} reset={reset} />
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
