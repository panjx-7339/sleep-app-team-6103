import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { auth } from "../../../firebase/config";

const ForgotPasswordButton = (props) => {
  const handlePasswordReset = () => {
    if (props.email === "") {
      alert("Please enter your email address.");
      return;
    }
    auth
      .sendPasswordResetEmail(props.email)
      .then(() => {
        alert("Password reset email has been sent.");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            alert("Please enter a valid email address.");
            break;
          default:
            alert(error.message);
            break;
        }
      });
  };

  return (
    <TouchableOpacity className="mt-2 self-end" onPress={handlePasswordReset}>
      <Text style={styles.text}>Forgot Password?</Text>
    </TouchableOpacity>
  );
};

export default ForgotPasswordButton;

const styles = StyleSheet.create({
  container: {},
  text: {
    fontFamily: "K2DBold",
    color: "#fff",
  },
});
