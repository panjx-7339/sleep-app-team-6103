import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const NavigationButton = (props) => {
  const navigation = useNavigation();
  const icon = props.icon;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate(props.navigateTo)}>
        {icon}
      </TouchableOpacity>
    </View>
  );
};

export default NavigationButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
