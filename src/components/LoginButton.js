import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { auth, db } from "../firebase/config";
import { useNavigation } from "@react-navigation/native";
import ShopItems from "./ShopItems";

const LoginButton = (props) => {
  const navigation = useNavigation();
  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(props.email, props.password);
      navigation.navigate("Home");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          alert("Invalid email provided");
          break;
        case "auth/missing-password":
          alert("Missing password");
          break;
        case "auth/invalid-credential":
          alert("Invalid credentials");
          break;
        default:
          alert(error.code);
          break;
      }
    }
  };

  const handleSignUp = async () => {
    try {
      if (props.password !== props.confirmPassword) {
        alert("Passwords entered do not match");
        return; 
      }
      const userCredential = await auth.createUserWithEmailAndPassword(
        props.email,
        props.password
      );

      const userInfo = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        sleepGoal: 8,
        points: 0,
      };
      await db.collection("users").doc(userCredential.user.uid).set(userInfo);
      navigation.navigate("Home");

      const userShopRef = db
      .collection("users")
      .doc(userCredential.user.uid)
      .collection("shop");
      
      Object.entries(ShopItems).forEach(([name, item]) => {
        userShopRef
          .doc(name)
          .set(item)
          .then(() => {
            console.log("Document successfully written for: ", name)
          })
          .catch((error) => console.error("Error adding document for: ", name, error))
        }
      );
      
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          alert("Invalid email provided");
          break;
        case "auth/weak-password":
          alert("Invalid password provided, should be at least 6 characters");
          break;
        case "auth/email-already-in-use":
          alert("Email is already is use");
          break;
        default:
          alert(error.message);
          break;
      }
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={props.type === "login" ? handleLogin : handleSignUp}
    >
      <Text style={styles.text}>
        {props.type === "login" ? "Login" : "Register"}
      </Text>
    </TouchableOpacity>
  );
};

export default LoginButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2C2C4D",
    fontFamily: "K2D",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 15,
  },
  text: {
    fontFamily: "K2DBold",
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
  },
});
