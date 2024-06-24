import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { auth, db } from "../../../firebase/config";

const Item = (props) => {
  // handles buying of item when button is pressed 
  const handleBuyItem = async () => {
    try {
      const user = auth.currentUser;
      const uid = user.uid;
      if (uid) {
        const userDocRef = db.collection("users").doc(uid);
        const itemPoints = props.points;
        const itemName = props.name;
        const isBought = props.isBought;

        // Get current points of user
        const userDoc = await userDocRef.get();
        const userPoints = userDoc.data().points;
        
        if (isBought) {
          console.log("Item already bought")
        }
        else if (userPoints >= props.points) {
          // Deduct points
          const updatedPoints = userPoints - itemPoints;
          await userDocRef
            .update({ 
              points: updatedPoints 
            })
            .then(
              console.log("Points successfully updated for", itemName)
            )
            .catch((error) => {
              console.error("Error updating points for", itemName, error);
            });

          // Update item as bought
          const itemDocRef = userDocRef.collection("shop").doc(itemName);
          await itemDocRef
            .update({ 
              isBought: true 
            })
            .then(
              console.log(`${itemName} successfully bought!`)
            )
            .catch((error) => {
              console.error("Error updating isBought for", itemName, error);
            });
        } else {
          console.log("Not enough points to purchase this item");
        }
      }
    } catch (error) {
      console.error("Error buying item: ", error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.largeText}>{props.name}</Text>
      </View>
      <View className="flex-1 w-full items-center justify-end">
        <TouchableOpacity 
          style={styles.button}
          onPress={handleBuyItem}
        >
          <Text style={styles.smallText}>{props.points} points</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Item;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6C6CB3",
    width: "90%", // is cut off when width is 100% 
    height: 250,
    alignItems: "center",
    marginHorizontal: 20, 
    marginVertical: 20,
    borderRadius: 20, 
  }, 
  title: {
    backgroundColor: "#ED9500",
    width: "80%", 
    borderRadius: 15, 
    height: 35,
    marginTop: 10,
    alignItems: "center", 
    justifyContent: "center",
  }, 
  image: {
    width: 100, 
    height: 100,
  },
  button: {
    backgroundColor: "#fff", 
    borderRadius: 20, 
    width: "30%", 
    height: 30,
    marginBottom: 10,
    alignItems: "center", 
    justifyContent: "center",
  },
  largeText: {
    fontFamily: "K2D",
    fontSize: 20,
    color: "#fff",
  }, 
  smallText: {
    fontFamily: "K2D",
    fontSize: 15,
    color: "#000",
  }
});

