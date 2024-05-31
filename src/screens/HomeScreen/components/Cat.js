import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Cat = () => {
  return (
    <View>
      <Image
        source={require("../../../../assets/cat-image.png")}
        style={{ width: 500, height: 500 }}
      />
    </View>
  );
};
export default Cat;
const styles = StyleSheet.create({});
