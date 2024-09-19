import { View, StyleSheet } from "react-native";
import React from "react";
import { UlText } from "../ul-text";
import * as Animatable from "react-native-animatable";


export const UlInfoLine = (props) => {
    let { label, value, gray, index } = props
    let color = gray ? "rgba(239,239,239,0.62)" : "transparent"

    return (
        <Animatable.View
            key={index}
            animation="bounceInLeft"
            easing="ease-in-out"
            iterationCount="1"
            duration={800}
            delay={index * 30}
            style={{ flexDirection: "row", paddingHorizontal: 10, backgroundColor: color }}
        >
            <View style={{ width: "50%", justifyContent: "center" }}>
                <UlText style={{ fontSize: 16, color: "#8397a6" }}>{label}</UlText>
            </View>
            <View style={st.lineWrapper}>
                <UlText style={{ fontSize: 16, color: "#000000" }}>{value || "-"}</UlText>
            </View>
        </Animatable.View>
    )
}


const st = StyleSheet.create({
    lineWrapper: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 7,
        paddingHorizontal: 10,
    },
})
