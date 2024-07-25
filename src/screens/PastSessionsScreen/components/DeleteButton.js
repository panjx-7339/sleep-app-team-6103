import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase/config";
import AntDesign from "@expo/vector-icons/AntDesign";
import { doc, deleteDoc, collection } from "firebase/firestore";

const DeleteButton = (props) => {
  const user = auth.currentUser;
  const uid = user.uid;

  const userSessionsRef = collection(db, "users", uid, "sessions");

  const icon = <AntDesign name="delete" size={24} color="white" />;
  const handlePress = async () => {
    const sessionDocRef = doc(userSessionsRef, props.sessId);
    await deleteDoc(sessionDocRef);
  };
  return (
    <View>
      <TouchableOpacity onPress={handlePress}>{icon}</TouchableOpacity>
    </View>
  );
};

export default DeleteButton;

const styles = StyleSheet.create({});
