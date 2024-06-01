import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Logo from "../../components/Logo";
import LoginButton from "../../components/LoginButton";
import Redirect from "../../components/Redirect";
import LoginInput from "../../components/LoginInput";

const RegistrationScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <KeyboardAvoidingView
      className="h-screen flex items-center justify-center bg-blue-200"
      behaviour="padding"
    >
      <View>
        <Logo />
      </View>

      <View className="w-4/5">
        <LoginInput
          string="Email"
          value={email}
          setValue={setEmail}
          isSecure={false}
        />
        <LoginInput
          string="Password"
          value={password}
          setValue={setPassword}
          isSecure={true}
        />
        <LoginInput
          string="Confirm Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          isSecure={true}
        />
      </View>

      <View className="w-3/5 flex justify-center items-center mt-10">
        <LoginButton
          type="register"
          email={email}
          password={password}
          confirmPassword={confirmPassword}
        />
        <Redirect
          string="Already have an account? Log in here."
          redirectTo="Login"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({});
