import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const LoginInput = (props) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={props.string}
      value={props.value}
      onChangeText={(text) => props.setValue(text)}
      secureTextEntry={props.isSecure}
    />
  );
};

export default LoginInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    fontFamily: "K2D",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 15,
  },
});
