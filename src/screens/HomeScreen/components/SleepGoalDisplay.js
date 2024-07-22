import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { React, useState, useEffect } from "react";

import { auth, db } from "../../../firebase/config";

const SleepGoalDisplay = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [input, onChangeInput] = useState("");
  const [sleepGoal, setSleepGoal] = useState();

  const user = auth.currentUser;
  const uid = user.uid;

  useEffect(() => {
    if (uid) {
      const userDocRef = db.collection("users").doc(uid);
      const unsubscribe = userDocRef.onSnapshot(
        (doc) => {
          const data = doc.data();
          if (data) {
            const newSleepGoal = data.sleepGoal;
            setSleepGoal(newSleepGoal);
            console.log("Sleep goal set: ", newSleepGoal);
          }
        },
        (error) => {
          console.error("Error fetching sleep goal: ", error);
        }
      );
      return () => unsubscribe();
    }
  }, [uid]);

  const addSleepGoal = async () => {
    if (uid) {
      try {
        const userInput = +input; // convert input string to Number
        if (userInput < 5) {
          alert("Insufficient sleep! Sleep goal should be at least 5 hours.");
          return;
        } else if (userInput >= 24) {
          alert("Sleep goal cannot exceed 24 hours.");
          return;
        }
        await db.collection("users").doc(uid).update({
          sleepGoal: userInput,
        });
        console.log("Sleep goal updated for user ID: ", uid);
      } catch (error) {
        console.error("Error updating sleep goal: ", error);
      } finally {
        setModalVisible(!modalVisible);
      }
    }
  };

  return (
    <View className="flex-1 w-full h-full items-end">
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <KeyboardAvoidingView
          style={styles.centeredView}
          behavior={Platform.OS === "android" ? "height" : "padding"}
        >
          <View style={styles.modalContainer}>
            <Text style={[styles.text, { color: "#fff" }]}>
              Please enter your sleep goal, in hours:
            </Text>
            <TextInput
              style={styles.inputContainer}
              onChangeText={onChangeInput}
              value={input}
              keyboardType="numeric"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "lightcoral" }]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.text}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: "palegreen" }]}
                onPress={addSleepGoal}
              >
                <Text style={styles.text}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <TouchableOpacity
        style={styles.goalButton}
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-center text-white text-xs">
          Today's Goal: {sleepGoal ? `${sleepGoal} hours` : "Not Set"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SleepGoalDisplay;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#6C6CB3",
    borderColor: "#fff",
    borderWidth: 3,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  inputContainer: {
    backgroundColor: "#fff",
    fontFamily: "K2D",
    borderRadius: 20,
    marginVertical: 20,
    width: "80%",
    height: "15%",
    textAlign: "center",
  },
  text: {
    fontFamily: "K2DBold",
    fontSize: 15,
    color: "#000",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    borderRadius: 20,
    marginHorizontal: 10,
    padding: "1%",
  },
  goalButton: {
    backgroundColor: "#38387F",
    width: "80%",
    borderRadius: 10,
    marginTop: 30,
    marginRight: 30,
    padding: 10,
  },
});
