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

  const iosView = (
    <View>
      <DateTimePicker
        testID={props.testID}
        value={props.value}
        mode={props.mode}
        is24Hour={true}
        display="default"
        onChange={onChange}
      />
    </View>
  );

  const androidView = (
    <View>
      <TouchableOpacity
        onPress={showDatepicker}
        className="bg-gray-300 rounded-sm"
      >
        <Text>
          {props.mode === "date"
            ? props.value.toLocaleDateString()
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

const styles = StyleSheet.create({});
