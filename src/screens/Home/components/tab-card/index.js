import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { HomeProfileStyles as st } from "../../styles";
import { RightIcon } from "@assets/icons";



export const TabCard = (props) => {
    let { navigation, card, index } = props;

    return (
        <TouchableOpacity
            key={index}
            style={[st.tabCard, { backgroundColor: card.color }]}
            onPress={() => navigation.navigate(card.to)}
        >
            <View style={{ flex: 1 }}>
                <View style={{ flex: 6, alignItems: 'center', justifyContent: "center" }}>
                    <Text style={st.tabLabel}>{card.label}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: 20, paddingBottom: 10 }}>
                    <TouchableOpacity
                        style={st.arrowIconWrapper}
                        onPress={() => navigation.navigate(card.to)}
                    >
                        <RightIcon color="#fff" size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}
