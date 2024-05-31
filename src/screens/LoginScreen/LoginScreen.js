import {
  KeyboardAvoidingView,
  secureTextEntry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../../firebase/config";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../components/Logo";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  //auth listener
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.");
              return;
            }
            const user = firestoreDocument.data();
            navigation.navigate("Home", { user: user });
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView
      className="h-screen flex items-center justify-center bg-blue-200"
      behavior={Platform.OS === "android" ? "height" : "padding"}
    >
      <View>
        <Logo />
      </View>

      <View className="w-4/5">
        <TextInput
          className="bg-white px-4 py-2 rounded-lg mt-1"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          className="bg-white px-4 py-2 rounded-lg mt-1"
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>

      <View className="w-3/5 flex justify-center items-center mt-10">
        <TouchableOpacity
          className="w-full bg-white mt-1 border-2 border-[#0782F9] p-4 rounded-lg flex items-center"
          onPress={handleLogin}
        >
          <Text className="text-center">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full p-2 flex items-center"
          onPress={() => navigation.navigate("Registration")}
        >
          <Text className="text-center text-s underline">
            New to this app? Create an account here.
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
