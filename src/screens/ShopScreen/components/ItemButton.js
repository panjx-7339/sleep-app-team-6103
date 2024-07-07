import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { auth, db } from "../../../firebase/config";

const ItemButton = (props) => {
  const itemPoints = props.points;
  const itemName = props.name;
  const isBought = props.isBought;
  const isEquipped = props.isEquipped

  const user = auth.currentUser;
  const uid = user.uid;
  // handles buying of item when button is pressed
  const handleBuyItem = async () => {
    try {
      if (uid) {
        const userDocRef = db.collection("users").doc(uid);
        
        // Get current points of user
        const userDoc = await userDocRef.get();
        const userPoints = userDoc.data().points;

        if (isBought) {
          alert("Item already bought");
        } else if (userPoints >= itemPoints) {
          // Deduct points
          const updatedPoints = userPoints - itemPoints;
          await userDocRef
            .update({
              points: updatedPoints,
            })
            .then(console.log("Points successfully updated for", itemName))
            .catch((error) => {
              console.error("Error updating points for", itemName, error);
            });

          // Update item as bought
          const itemDocRef = userDocRef.collection("shop").doc(itemName);
          await itemDocRef
            .update({
              isBought: true,
            })
            .then(() => {
              alert(`${itemName} successfully bought!`)
            })
            .catch((error) => {
              console.error("Error buying", itemName, error);
            });
        } else {
          alert("Insufficient points to purchase this item");
        }
      }
    } catch (error) {
      console.error("Error buying item: ", error);
    }
  };
  
  let buttonText;
  let onPressHandler;
  let buttonStyle;

  if (isBought && isEquipped) {
    buttonText = 'Unequip';
  }
  else if (isBought) {
    buttonText = 'Equip';
    buttonStyle = [styles.button, {backgroundColor: "#FFCA28"}];
  }
  else {
    buttonText = `${itemPoints} points`;
    onPressHandler = handleBuyItem;
    buttonStyle = styles.button;
  }

  return (
    <View className="w-full items-center justify-end">
      <TouchableOpacity style={buttonStyle} onPress={onPressHandler}>
          <Text style={styles.smallText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ItemButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "30%",
    height: 30,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  smallText: {
    fontFamily: "K2D",
    fontSize: 15,
    color: "#000",
  },
});
