import { React, useState }from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import { auth, db } from "../../../firebase/config";

const ItemButton = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const itemPoints = props.points;
  const itemName = props.name;
  const isBought = props.isBought;
  const isEquipped = props.isEquipped

  const user = auth.currentUser;
  const uid = user.uid;
  
  // handles buying of item when confirm button is pressed
  const handleBuyItem = async () => {
    try {
      if (uid) {
        const userDocRef = db.collection("users").doc(uid);
        
        // Get current points of user
        const userDoc = await userDocRef.get();
        const userPoints = userDoc.data().points;

        if (userPoints >= itemPoints) {
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
      console.log("Error buying item: ", error);
    } finally {
      setModalVisible(!modalVisible);
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
    onPressHandler = () => setModalVisible(true); // sus
    buttonStyle = styles.button;
  }

  return (
    <View className="w-full items-center">
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalContainer}>
            <Text style={[styles.text, { color: "#fff" }]}>
              Do you wish to purchase {itemName}?
            </Text>
          
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "lightcoral" }]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.text}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "palegreen" }]}
                onPress={handleBuyItem}
              >
                <Text style={styles.text}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={buttonStyle} onPress={onPressHandler}>
          <Text style={styles.smallText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ItemButton;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  smallText: {
    fontFamily: "K2D",
    fontSize: 15,
    color: "#000",
  },
  modalContainer: {
    backgroundColor: "#6C6CB3",
    borderColor: "#fff",
    borderWidth: 3,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: "5%",
    width: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: "5%"
  },
  modalButton: {
    borderRadius: 20,
    marginHorizontal: 10,
    paddingHorizontal: "5%",
  },
  text: {
    fontFamily: "K2DBold",
    fontSize: 15,
    color: "#000",
    textAlign: "center",
  },
});
