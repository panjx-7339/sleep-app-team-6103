import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CurrentDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDay();
  const date = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December"]
  
  return (
    <View style={styles.container}>
      <Text style={styles.textLarge}>Today, {dayNames[day]}</Text>
      <Text style={styles.textMedium}>{date} {monthNames[month]} {year}</Text>
    </View>
  );
};

export default CurrentDate;

const styles = StyleSheet.create({
  container: { 
    marginLeft: 30,
    marginTop: 20,
  },
  textLarge: {
    fontFamily: "K2D",
    color: "#fff", 
    fontSize: 25,
  },

  textMedium: {
    fontFamily: "K2D", 
    color: "#8D8D8D",
    fontSize: 20,
  }

});
