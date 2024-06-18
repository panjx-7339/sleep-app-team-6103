import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import React from "react";
import { auth, db } from "../../../firebase/config";
import { useState, useEffect } from "react";
import { BarChart } from "react-native-chart-kit";
import Session from "../../PastSessionsScreen/components/Session";

const Graph = () => {
  const [uid, setUid] = useState();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      }
    });
    return unsubscribe;
  }, []);

  const userSessionsRef = db
    .collection("users")
    .doc(uid)
    .collection("sessions");

  const [sessions, setSessions] = useState();
  const [daysShown, setDaysShown] = useState(7);

  const initializeSessions = async () => {
    if (uid) {
      const querySnapshot = await userSessionsRef
        .orderBy("start", "desc")
        .get();
      const userSessions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        start: doc.data().start.toDate(),
        end: doc.data().end.toDate(),
        durationInHours: doc.data().durationInHours,
        startString: formatString(doc.data().start.toDate()),
        endString: formatString(doc.data().end.toDate()),
      }));
      setSessions(userSessions);
    }
  };

  useEffect(() => {
    initializeSessions();
  }, [uid]);

  const formatString = (date) => {
    return date.toString();
  };

  const processData = () => {
    const today = new Date();
    today.setHours(23);
    today.setMinutes(59);
    const xAxis = [];
    for (i = 0; i < daysShown; i++) {
      newDate = new Date(today - i);
      xAxis[i] = newDate.toString();
    }
    const yAxis = Array(daysShown).fill(0);
    let i = daysShown - 1;
    sessions &&
      sessions.map((session) => {
        const i = today - session.end;
        console.log("Day: ", session.end.getDay());
        console.log(i);
        const index = session.end.getDay();
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

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
        Sleep Graph
      </Text>
      <BarChart
        data={processData()}
        width={Dimensions.get("window").width}
        height={220}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default Graph;

const styles = StyleSheet.create({});
