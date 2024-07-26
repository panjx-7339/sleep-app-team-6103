import { ScrollView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";

import { auth, db } from "../../../firebase/config";
import Item from "./Item";

const ShopList = () => {
  const [items, setItems] = useState({});

  const user = auth.currentUser;
  const uid = user.uid;

  useEffect(() => {
    if (uid) {
      const shopRef = collection(db, "users", uid, "shop");

      const unsubscribe = onSnapshot(shopRef, (snapshot) => {
        const shopItems = {};
        snapshot.forEach((doc) => {
          shopItems[doc.id] = doc.data();
        });
        setItems(shopItems);
      });
      return () => unsubscribe();
    }
  }, [uid]);

  return (
    <ScrollView>
      {items &&
        Object.keys(items).map((key) => (
          <Item
            key={key}
            itemKey={key}
            name={items[key].name}
            points={items[key].points}
            isBought={items[key].isBought}
            isEquipped={items[key].isEquipped}
          />
        ))}
    </ScrollView>
  );
};

export default ShopList;

const styles = StyleSheet.create({});
