import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { firebase } from "../firebase/config";

const ForgotPasswordButton = (props) => {
  const handlePasswordReset = () => {
    if (props.email === "") {
      alert("Please enter your email address.");
      return;
    }
    firebase.auth().sendPasswordResetEmail(props.email)
      .then(() => {
        alert("Password reset email has been sent.");
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            alert("Please enter a valid email address.");
            break;
          default:
            alert("An error has occurred. Please try again.")
        };
        // alert(error.message);
      });
  };

    return (
    <TouchableOpacity 
        className="mt-2 self-end"
        onPress={handlePasswordReset}>
        <Text className="text-sm font-bold">
        Forgot Password?
        </Text>
    </TouchableOpacity>
    );
};

export default ForgotPasswordButton;

const styles = StyleSheet.create({});

