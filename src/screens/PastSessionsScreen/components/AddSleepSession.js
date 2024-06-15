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
      const docRef = await userSessionsRef.add({
        start: start,
        end: end,
        durationInHours: durationInHours,
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
    <View className="flex-row items-center">
      <View>
        <View className="flex-row items-center">
          <Text>Start: </Text>
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
        <View className="flex-row items-center">
          <Text> End: </Text>
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

      <TouchableOpacity
        className="bg-white h-12 border-2 border-[#0782F9] px-4 py-2 rounded-lg flex items-center justify-center"
        onPress={handleAddInput}
      >
        <Text className="text-center text-base">Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddSleepSession;

const styles = StyleSheet.create({});
