import {StyleSheet, Text, View} from "react-native";
import PriceC from "../../../../plugins/price-c";
import React from "react";
import {UlText} from "../../../../components";


export const CardSection = (props) => {
    let {label, index, price, color} = props

    return(
        <View style={[st.salesItemWrapper, index === 0 && {borderTopWidth: 0}]}>
            <UlText style={st.salesLabel}>{label}</UlText>
            <UlText style={[st.price, {color: color}]}>$ {PriceC.convert(price)}</UlText>
        </View>
    )
}


const st = StyleSheet.create({
    salesItemWrapper: {
        alignItems: "flex-end",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopStyle: "solid",
        borderTopColor: "#F3F3F3",
    },
    salesLabel: {
        color: "#A1A2A3",
        fontSize: 14,
        fontWeight: "500",
    },
    price: {
        fontSize: 22,
        fontWeight: "700",
    }
})
