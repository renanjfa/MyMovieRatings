import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const StarButton = ({ value, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress(value)}>
            <View style={{ alignItems: "center", marginHorizontal: 4 }}>
                <FontAwesome name="star" size={30} color="#FFD700" />
                <Text style={{color:"white"}}>{value}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default StarButton;