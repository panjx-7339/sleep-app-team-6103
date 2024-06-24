import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase/config";
import Picker from "./Picker";
import AntDesign from "@expo/vector-icons/AntDesign";

const AddSleepSession = () => {
  const [uid, setUid] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      }
    });
  }, []);
  const userSessionsRef = db
    .collection("users")
    .doc(uid)
    .collection("sessions");
  const userDocRef = db.collection("users").doc(uid);

  const handleAddInput = async () => {
    try {
      const start = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        startTime.getHours(),
        startTime.getMinutes()
      );
      const end = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
        endTime.getHours(),
        endTime.getMinutes()
      );
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
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.row}>
          <Text style={styles.text}>Start: </Text>
          <Picker
            testID="startDatePicker"
            value={startDate}
            setter={setStartDate}
            mode="date"
          />
          <Picker
            testID="startTimePicker"
            value={startTime}
            setter={setStartTime}
            mode="time"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}> End: </Text>
          <Picker
            testID="endDatePicker"
            value={endDate}
            setter={setEndDate}
            mode="date"
          />
          <Picker
            testID="endTimePicker"
            value={endTime}
            setter={setEndTime}
            mode="time"
          />
        </View>
      </View>

      <TouchableOpacity onPress={handleAddInput} style={{ marginLeft: 20 }}>
        <AntDesign name="pluscircleo" size={34} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default AddSleepSession;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1D3573",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 15,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  text: {
    fontFamily: "K2DBold",
    color: "#fff",
    fontSize: 18,
  },
  row: {
    flexDirection: "row",
  },
});
