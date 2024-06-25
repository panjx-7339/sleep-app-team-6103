import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Redirect = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(props.redirectTo)}
    >
      <Text style={styles.text}>{props.string} </Text>
    </TouchableOpacity>
  );
};

export default Redirect;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 3,
  },
  text: {
    fontFamily: "K2DBold",
    color: "#fff",
    textAlign: "center",
  },
});
