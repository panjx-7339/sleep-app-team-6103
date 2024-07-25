import { StyleSheet, ImageBackground, View, Text } from "react-native";
import { React, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import Cat from "./components/Cat";
import TopBar from "./components/TopBar";
import Lights from "./components/items/Lights";
import FloorItem from "./components/items/FloorItem";
import NavigationTab from "../../components/NavigationTab/NavigationTab";
import { auth, db } from "../../firebase/config";
import SleepStopwatch from "./components/SleepStopwatch";

const HomeScreen = () => {
  const user = auth.currentUser;
  const uid = user.uid;

  const [sessions, setSessions] = useState();
  const [goal, setGoal] = useState();
  const [isSleeping, setIsSleeping] = useState();

  useEffect(() => {
    if (!uid) return;
    const userSessionsRef = collection(db, "users", uid, "sessions");
    const userDocRef = doc(db, "users", uid);

    const getSessions = onSnapshot(
      query(userSessionsRef, orderBy("start", "desc")),
      (querySnapshot) => {
        const userSessions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          start: doc.data().start.toDate(),
          end: doc.data().end.toDate(),
          durationInHours: doc.data().durationInHours,
        }));
        setSessions(userSessions);
      }
    );

    const getData = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        setGoal(userData.sleepGoal);
        setIsSleeping(userData.isSleeping);
      }
    });

    return () => {
      getSessions();
      getData();
    };
  }, [uid]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/background.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <SafeAreaView style={styles.container}>
          <View className="h-full w-full flex-1">
            <TopBar />
            <View style={styles.stopwatchContainer}>
              <SleepStopwatch />
            </View>
            <View style={styles.lightsContainer}>
              <Lights />
            </View>
            <View style={styles.catContainer}>
              <View style={styles.catItem}>
                <FloorItem name="Bed" width={290} height={160} />
              </View>
              <Cat sessions={sessions} goal={goal} isSleeping={isSleeping} />
            </View>
            <View style={styles.itemsContainer}>
              <FloorItem name="Bowl" width={150} height={200} />
              <FloorItem name="Mouse Toy" width={150} height={200} />
            </View>
            <NavigationTab />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  stopwatchContainer: {
    flex: 1,
    marginTop: "10%",
    zIndex: 5,
  },
  lightsContainer: {
    flex: 1,
    justifyContent: "center",
    zIndex: 0,
    //backgroundColor: "red"
  },
  catContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    paddingBottom: "20%",
  },
  catItem: {
    position: "absolute",
    bottom: "0%",
    justifyContent: "center",
    alignItems: "center",
  },
  itemsContainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "5%",
  },
});
