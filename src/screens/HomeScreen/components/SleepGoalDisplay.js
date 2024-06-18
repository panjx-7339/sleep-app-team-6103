import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal } from "react-native";
import { React, useState, useEffect } from "react";
import { auth, db } from "../../../firebase/config";

const SleepGoalDisplay = () => {
  const [uid, setUid] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [number, onChangeNumber] = useState('');

  useEffect(() => {
    // Get current user id
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      }
    });
    return unsubscribe;
  }, []);

  const addSleepGoal = async () => {
    if (uid) {
      try {
        const sleepGoal = +number; // convert input string to Number
        if (sleepGoal < 5) {
          alert("Insufficient sleep! Sleep goal should be at least 5 hours.");
          return;
        } else if (sleepGoal >= 24) {
          alert("Sleep goal cannot exceed 24 hours.");
          return;
        }
        await db.collection("users").doc(uid).update({
          sleepGoal: sleepGoal
        });
        console.log("Sleep goal updated for user ID: ", uid);
      } catch (error) {
        console.error("Error updating sleep goal: ", error);
      } finally {
        setModalVisible(!modalVisible);
      }
    } else {
      alert("Error", "User is not logged in");
    }
  };

  return (
    <View>
      <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
        <View className="flex-1 justify-center items-center">  
          <View className="bg-[#6C6CB3] p-8 rounded-lg items-center">
            <Text className="text-white">Please enter your sleep goal, in hours:</Text>
            <TextInput
              className=""
              onChangeText={onChangeNumber}
              value={number}
              keyboardType="numeric"
            />
            <TouchableOpacity
              className="bg-white px-3 py-2 rounded-full"
              onPress={addSleepGoal}>
              <Text className=" text-center text-black">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      <TouchableOpacity 
        className=" bg-blue-800 mt-1 border-2 border-gray-500 px-1 py-1 rounded-lg w-2/3"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-center text-white">Today's Goal: </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SleepGoalDisplay;

const styles = StyleSheet.create({});
