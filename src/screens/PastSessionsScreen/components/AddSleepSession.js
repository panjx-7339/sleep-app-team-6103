import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React from "react";
import { useState } from "react";
import { db } from "../../../firebase/config";
import { collection, addDoc } from "firebase/firestore";

const AddSleepSession = () => {
  const handleAddInput = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        start: { start },
        end: { end },
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  return (
    <View>
      <TextInput
        className="bg-white px-4 py-2 rounded-lg mt-1"
        placeholder="start"
        value={start}
        onChangeText={(text) => setStart(text)}
      />

      <TextInput
        className="bg-white px-4 py-2 rounded-lg mt-1"
        placeholder="end"
        value={end}
        onChangeText={(text) => setEnd(text)}
      />

      <TouchableOpacity
        className="w-full bg-white mt-1 border-2 border-[#0782F9] p-4 rounded-lg flex items-center"
        onPress={handleAddInput}
      >
        <Text className="text-center">Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddSleepSession;

const styles = StyleSheet.create({});
