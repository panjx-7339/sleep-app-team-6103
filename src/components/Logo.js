import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Logo = () => {
  return (
    <View>
      <Text className="text-center text-2xl font-bold">DreamCat</Text>
      <Image
        source={require("../../assets/cat-image.png")}
        style={{ width: 300, height: 300 }}
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({});
