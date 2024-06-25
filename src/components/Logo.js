import { StyleSheet, View, Image } from "react-native";
import React from "react";

const Logo = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={{ width: 300, height: 300 }}
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center",
  },
});
