import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Cat = (props) => {
  const getCat = () => {
    const today = new Date();
    today.setHours(23);
    today.setMinutes(59);

    const pastDays = [];

    props.sessions &&
      props.sessions.map((session) => {
        if (pastDays.length < 3) {
          const index = Math.floor((today - session.end) / 86400000);
          while (pastDays.length <= index) {
            pastDays.push(0);
          }
          pastDays[index] += session.durationInHours;
        }
      });
    console.log(pastDays);
    if (pastDays[0] === 0 && pastDays[1] < props.goal) {
      return require("../../../../assets/sad-cat.png");
    } else if (pastDays[0] >= props.goal) {
      return require("../../../../assets/happy-cat.png");
    } else {
      return require("../../../../assets/sad-cat.png");
    }
  };

  const catImage = getCat();

  return (
    <View className="flex-1 justify-center items-center">
      <Image source={catImage} style={{ width: 300, height: 300 }} />
    </View>
  );
};
export default Cat;
const styles = StyleSheet.create({});
