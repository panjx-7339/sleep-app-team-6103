import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

const Prediction = (props) => {
  const goal = props.goal;
  const findDays = () => {
    const today = new Date();
    today.setHours(23);
    today.setMinutes(59);

    const pastDays = [];

    props.sessions &&
      props.sessions.map((session) => {
        const index = Math.floor((today - session.end) / 86400000);
        while (pastDays.length <= index) {
          pastDays.push(0);
        }
        pastDays[index] += session.durationInHours;
      });
    if (pastDays.length < 8) {
      return "Track more than 7 sleep sessions to see when you are most likely to miss your sleep goal.";
    }
    const todayDay = today.getDay();

    counter = todayDay;

    const daySuccessCount = Array(7).fill(0);
    const dayTotalCount = Array(7).fill(0);
    for (i = 0; i < pastDays.length; i++) {
      if (pastDays[i] != 0) {
        if (pastDays[i] >= goal) {
          daySuccessCount[counter]++;
          dayTotalCount[counter]++;
        } else {
          dayTotalCount[counter]++;
        }
      }
      if (counter == 0) {
        counter = 6;
      } else {
        counter--;
      }
    }

    const daySuccessRate = Array(7).fill(0);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    for (i = 0; i < 7; i++) {
      if (dayTotalCount[i] == 0) {
        daySuccessRate[i] = [2, days[i]];
      } else {
        daySuccessRate[i] = [daySuccessCount[i] / dayTotalCount[i], days[i]];
      }
    }
    daySuccessRate.sort((a, b) => a[0] - b[0]);
    console.log("Success Count: ", daySuccessCount);
    console.log("Total Count: ", dayTotalCount);
    console.log("Success Rate: ", daySuccessRate);

    return `You are most likely to miss your sleep goal on ${daySuccessRate[0][1]}, ${daySuccessRate[1][1]} and ${daySuccessRate[2][1]}`;
  };

  const message = findDays();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default Prediction;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#6C6CB3",
    borderRadius: 20,
    marginTop: 15,
    paddingBottom: 15,
  },

  text: {
    fontFamily: "K2D",
    alignSelf: "flex-start",
    fontSize: 15,
    color: "#fff",
  },
});
