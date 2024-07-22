import { React, useState, useEffect } from "react";
import { StyleSheet, Image, Dimensions } from "react-native";

import { auth, db } from "../../../../firebase/config"

const Lights = () => {
  const [isEquipped, setIsEquipped] = useState(false);
  
  const user = auth.currentUser;
  const uid = user.uid;

  useEffect(() => {
    if (uid) {
      const shopRef = db.collection("users").doc(uid).collection("shop");
      const shopItemDoc = shopRef.doc("Lights"); 
      const unsubscribe = shopItemDoc.onSnapshot((doc) => {
        let itemIsEquipped = doc.data().isEquipped;
        console.log(`Lights is equipped on home screen: ${itemIsEquipped}`)
        setIsEquipped(itemIsEquipped);
      });
      return () => unsubscribe();
    }
  }, [uid]);

  const getImage = () => {
    if (isEquipped) {
      return require("../../../../../assets/shopItems/lights-equip.png");
    }
    else {
      return require("../../../../../assets/shopItems/lights-blank.png")
    }
  }

  const lightsImage = getImage();
  const windowWidth = Dimensions.get('window').width;

  return (
    <Image source={lightsImage} style={{ width: windowWidth }} resizeMode="contain" />
  );
}

export default Lights;

const styles = StyleSheet.create({});