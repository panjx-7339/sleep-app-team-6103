import { StyleSheet, View, Text, Image } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { auth, db } from "../../../firebase/config";

const PointsDisplay = () => {
  const [points, setPoints] = useState(0);

  const user = auth.currentUser;
  const uid = user.uid;

  useEffect(() => {
    if (uid) {
      const userDocRef = doc(db, "users", uid);
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        let points = doc.data().points;
        console.log("Points:", points);
        setPoints(points);
      });
      return () => unsubscribe();
    }
  }, [uid]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/coin.png")}
        style={styles.image}
      />
      <Text style={styles.text}>{points}</Text>
    </View>
  );
};

export default PointsDisplay;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    position: "absolute",
    right: 0,
    borderRadius: 20,
    width: "30%",
    height: 30,
    alignItems: "center",
  },
  image: {
    width: 30,
    height: 30,
    position: "absolute",
    left: 0,
  },
  text: {
    fontFamily: "K2D",
    fontSize: 15,
    color: "#000",
    marginLeft: 35,
  },
});
