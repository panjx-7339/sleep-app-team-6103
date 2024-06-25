import { StyleSheet, View } from "react-native";
import React, { useState } from "react";

import Logo from "../../components/Logo";
import LoginButton from "../../components/LoginButton";
import Redirect from "../../components/Redirect";
import LoginInput from "../../components/LoginInput";
import AuthBackground from "../../components/AuthBackground";

const RegistrationScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <AuthBackground>
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      <View style={styles.inputContainer}>
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

      <View style={styles.buttonContainer}>
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
    </AuthBackground>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "80%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  inputContainer: {
    width: "80%",
    marginBottom: 30,
  },
  logoContainer: {
    marginBottom: 50,
    alignItems: "center",
  },
});
