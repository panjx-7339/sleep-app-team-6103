import {
  KeyboardAvoidingView,
  secureTextEntry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../../firebase/config";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../components/Logo"

const RegistrationScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView
      className="h-screen flex items-center justify-center bg-blue-200"
      behaviour="padding"
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
        <TextInput
          className="bg-white px-4 py-2 rounded-lg mt-1"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
        />
      </View>

      <View className="w-3/5 flex justify-center items-center mt-10">
        <TouchableOpacity
          className="w-full bg-white mt-1 border-2 border-[#0782F9] p-4 rounded-lg flex items-center"
          onPress={handleSignUp}
        >
          <Text className="text-center">Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full p-2 flex items-center"
          onPress={() => navigation.navigate("Login")}
        >
          <Text className="text-center text-s underline">
            Already have an account? Log in here.
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({});
