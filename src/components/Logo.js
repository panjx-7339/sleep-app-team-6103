import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Cat from "../screens/HomeScreen/components/Cat"

const Logo = () => {
    return (
    <View>
        <Text className="text-center text-2xl font-bold">
            DreamCat
        </Text>
        <Cat />
    </View>
    );
}

export default Logo;

const styles = StyleSheet.create({});