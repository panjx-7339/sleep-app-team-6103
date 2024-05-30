import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Cat = () => {
  return (
    <View className="place-contents-center">
      <Image
        className="place-contents-center"
        source={require("../../../../assets/cat-image.png")}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
};
export default Cat;
const styles = StyleSheet.create({});
