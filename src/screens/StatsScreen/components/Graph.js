import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { useState } from "react";
import { BarChart } from "react-native-chart-kit";

import SelectDays from "./SelectDays";

const Graph = (props) => {
  const [daysShown, setDaysShown] = useState(7);

  const processData = (daysShown) => {
    const today = new Date();
    today.setHours(23);
    today.setMinutes(59);
    const xAxis = [];
    let counter = daysShown - 1;
    for (i = 0; i < daysShown; i++) {
      const newDate = new Date(today - i * 86400000);
      const day = String(newDate.getDate());
      const month = String(newDate.getMonth() + 1);
      xAxis[counter] = `${day}/${month}`;
      counter--;
    }
    const yAxis = Array(daysShown).fill(0);
    let i = daysShown - 1;
    props.sessions &&
      props.sessions.map((session) => {
        const index =
          daysShown - 1 - Math.floor((today - session.end) / 86400000);
        yAxis[index] += session.durationInHours;
      });
    return {
      labels: xAxis,
      datasets: [
        {
          data: yAxis,
        },
      ],
    };
  };
  const sleepData = processData(daysShown);
  const barSize = daysShown === 7 ? 1 : 0.5;

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>Hours Slept </Text>
        <SelectDays value={daysShown} setter={setDaysShown} />
      </View>

      <BarChart
        data={sleepData}
        width={Dimensions.get("window").width - 50}
        height={300}
        yAxisInterval={1}
        verticalLabelRotation={-80}
        showValuesOnTopOfBars={true}
        chartConfig={{
          backgroundGradientFrom: "#6C6CB3",
          backgroundGradientTo: "#6C6CB3",
          color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          decimalPlaces: 1,
          barPercentage: barSize,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.graph}
      />
    </View>
  );
};

export default Graph;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 3,
    backgroundColor: "#6C6CB3",
    borderRadius: 20,
    marginTop: 15,
  },
  title: {
    color: "#fff",
    fontFamily: "K2DBold",
    fontSize: 15,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
  },
  graph: {
    alignSelf: "center",
  },
});
