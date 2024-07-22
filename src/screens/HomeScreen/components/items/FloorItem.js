import { React, useState, useEffect } from "react";
import { StyleSheet, Image, Dimensions } from "react-native";

import { auth, db } from "../../../../firebase/config"
import ItemImages from "../../../../components/ItemImages"

const FloorItem = (props) => {
  const [isEquipped, setIsEquipped] = useState(false);
  
  const itemName = props.name;
  const width = props.width;
  const height = props.height;

  const user = auth.currentUser;
  const uid = user.uid;

  useEffect(() => {
    if (uid) {
      const shopRef = db.collection("users").doc(uid).collection("shop");
      const shopItemDoc = shopRef.doc(itemName); 

      const unsubscribe = shopItemDoc.onSnapshot((doc) => {
        if (doc.exists) {
          const itemIsEquipped = doc.data().isEquipped;
          console.log(`${itemName} is equipped on home screen: ${itemIsEquipped}`);
          setIsEquipped(itemIsEquipped);
        } else {
          console.error(`${itemName} document does not exist`);
        }
      }, (error) => {
        console.error("Error fetching document: ", error);
      });
      return () => unsubscribe();
    }
  }, [uid, itemName]);


  const getImage = () => {
    if (isEquipped) {
      const itemImage = ItemImages[itemName];
      return itemImage;
    }
    else {
      return require("../../../../../assets/shopItems/blank.png")
    }
  }

  const bowlImage = getImage();

  return (
    <Image source={bowlImage} style={{width: width, height: height, margin: "3%" }} resizeMode="contain" />
  );
}

export default FloorItem;

const styles = StyleSheet.create({});