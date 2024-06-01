import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const LoginInput = (props) => {
  return (
    <TextInput
      className="bg-white px-4 py-2 rounded-lg mt-1"
      placeholder={props.string}
      value={props.value}
      onChangeText={(text) => props.setValue(text)}
      secureTextEntry={props.isSecure}
    />
  );
};

export default LoginInput;

const styles = StyleSheet.create({});
