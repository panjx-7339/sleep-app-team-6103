import { React, useState, useEffect }from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

import { auth, db } from "../../../firebase/config";
import ItemImages from "../../../components/ItemImages";
import ItemButton from "./ItemButton";

const Item = (props) => {
  const [isBought, setisBought] = useState(false);
  const [isEquipped, setisEquipped] = useState(false);
  
  const user = auth.currentUser;
  const uid = user.uid;

  useEffect(() => {
    if (uid) {
      console.log(`Setting up Firestore listener for ${props.name}`);

      const shopRef = db.collection("users").doc(uid).collection("shop");
      const shopItemDoc = shopRef.doc(props.itemKey);

      const unsubscribe = shopItemDoc.onSnapshot(
        (shopItemDoc) => {
          const itemData = shopItemDoc.data();
          if (itemData) { 
            const newIsBought = itemData.isBought;
            const newIsEquipped = itemData.isEquipped;
            
            setisBought(newIsBought);
            setisEquipped(newIsEquipped);

            console.log(`${props.name}: 
              isBought: ${newIsBought}, 
              isEquipped: ${newIsEquipped}`);
          }
        },
        (error) => {
          console.error("Error fetching item data: ", error);
        }
      );
      return () => {
        console.log(`Cleaning up Firestore listener for ${props.name}`);
        unsubscribe();
      };
    }
  }, [uid, props.itemKey]);

  const itemImage = ItemImages[props.name];

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.largeText}>{props.name}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={itemImage} style={{width: 150, height: 150}} resizeMode="contain" />
      </View>
      <ItemButton 
        name={props.name}
        points={props.points}
        isBought={isBought}
        isEquipped={isEquipped}
      />
    </View>
  );
};

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
  imageContainer: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
  },
  largeText: {
    fontFamily: "K2D",
    fontSize: 20,
    color: "#fff",
  },
});
