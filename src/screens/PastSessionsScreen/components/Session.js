import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DeleteButton from "./DeleteButton";

const Session = (props) => {
  const formatTime = (dateInput) => {
    const date = new Date(dateInput);
    const months = [
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
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const suffix = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${day} ${month} ${year}, ${hours}:${formattedMinutes}${suffix}`;
  };
  const start = formatTime(props.start);
  const end = formatTime(props.end);

  const duration = Math.round(props.duration * 10) / 10;

  return (
    <View style={styles.container}>
      <View style={styles.times}>
        <Text style={styles.text}>Start: {start}</Text>
        <Text style={styles.text}>End: {end}</Text>
      </View>
      <View style={styles.durationBox}>
        <Text style={styles.duration}>{duration} h</Text>
      </View>
      <DeleteButton sessId={props.sessId} />
    </View>
  );
};

export default Session;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#6C6CB3",
    borderRadius: 20,
    marginTop: 10,
    paddingBottom: 15,
    flexDirection: "row",
  },
  times: {
    flex: 4.5,
    justifyContent: "flex-start",
  },
  text: {
    color: "#fff",
    fontFamily: "K2D",
    fontSize: 15,
  },
  durationBox: { flex: 1, padding: 5 },
  duration: { color: "#fff", fontFamily: "K2D", fontSize: 20 },
});
