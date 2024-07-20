import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase/config";
import AntDesign from "@expo/vector-icons/AntDesign";

const DeleteButton = (props) => {
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

  const icon = <AntDesign name="delete" size={24} color="white" />;
  const handlePress = async () => {
    await userSessionsRef.doc(props.sessId).delete();
  };
  return (
    <View>
      <TouchableOpacity onPress={handlePress}>{icon}</TouchableOpacity>
    </View>
  );
};

export default DeleteButton;

const styles = StyleSheet.create({});
