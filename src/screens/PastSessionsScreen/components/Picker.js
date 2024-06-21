import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

const Picker = (props) => {
  const [showPicker, setShowPicker] = useState(false);
  const showDatepicker = () => {
    setShowPicker(true);
  };
  const onChange = (event, selected) => {
    const current = selected || props.value;
    props.setter(current);
    setShowPicker(false);
  };

  function formatDate(date) {
    const day = date.getDate();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  const iosView = (
    <View>
      <DateTimePicker
        testID={props.testID}
        value={props.value}
        mode={props.mode}
        is24Hour={true}
        display="default"
        onChange={onChange}
        themeVariant="dark"
      />
    </View>
  );

  const androidView = (
    <View>
      <TouchableOpacity onPress={showDatepicker} style={styles.androidPicker}>
        <Text style={styles.text}>
          {props.mode === "date"
            ? formatDate(props.value)
            : props.value.toLocaleTimeString()}
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          testID={props.testID}
          value={props.value}
          mode={props.mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
  return Platform.OS === "ios" ? iosView : androidView;
};

export default Picker;

const styles = StyleSheet.create({
  androidPicker: {
    backgroundColor: "rgba(128, 128, 128, 0.5)",
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    margin: 7,
  },
  text: {
    fontFamily: "K2D",
    color: "#fff",
  },
});
