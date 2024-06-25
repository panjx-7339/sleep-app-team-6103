import { StyleSheet, Text, View } from "react-native";
import React from "react";

import BasicStatsComponent from "./BasicStatsComponent";

const BasicStats = (props) => {
  const findAverages = () => {
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

    const average = (arr) => {
      let sum = 0;
      let counter = 0;
      for (let i = 0; i < arr.length; i++) {
        sum = arr[i] + sum;
        if (arr[i] != 0) {
          counter++;
        }
      }
      return sum / counter;
    };
    const past7Days = pastDays.slice(0, 7);
    const past30Days = pastDays.slice(0, 30);

    return [
      average(past7Days).toPrecision(2),
      average(past30Days).toPrecision(2),
      average(pastDays).toPrecision(2),
    ];
  };

  const processedData = findAverages();

  const averageOf7 = processedData[0];
  const averageOf30 = processedData[1];
  const averageOfAll = processedData[2];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Average hours slept...</Text>
      <View style={styles.averages}>
        <BasicStatsComponent text="Past 7 Days" value={averageOf7} />
        <BasicStatsComponent text="Past 30 Days" value={averageOf30} />
        <BasicStatsComponent text="All-time" value={averageOfAll} />
      </View>
    </View>
  );
};

export default BasicStats;

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
  averages: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    fontFamily: "K2DBold",
    alignSelf: "flex-start",
    fontSize: 15,
    color: "#fff",
  },
});
