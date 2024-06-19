import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";

const SelectDays = (props) => {
  const data = [
    { label: "Last 7 Days", value: 7 },
    { label: "Last 30 Days", value: 30 },
  ];

  return (
    <View>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select an option"
        value={props.value}
        onChange={(item) => {
          props.setter(item.value);
        }}
      />
    </View>
  );
};

export default SelectDays;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: 150,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontFamily: "K2D",
    fontSize: 13,
    color: "#fff",
  },
  selectedTextStyle: {
    fontFamily: "K2D",
    fontSize: 13,
    color: "#fff",
  },
});
