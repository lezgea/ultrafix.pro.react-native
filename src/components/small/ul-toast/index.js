import React from 'react'
import { View, StyleSheet } from "react-native";
import { UlText } from "../ul-text";
import { ChecklistIcon } from '@assets/icons';


export const UlToast = (props) => {
    let { type } = props

    switch (type) {
        case "success":
            return <SuccessToast {...props} />
        case "warning":
            return <WarningToast {...props} />
        case "error":
            return <ErrorToast {...props} />
        default:
            return <WarningToast {...props} />
    }
}


const SuccessToast = (props) => {
    let { message } = props

    return (
        <View style={[st.wrapper, { backgroundColor: "rgba(94,162,46,0.9)" }]}>
            <View style={st.indicator} />
            <View style={st.textWrapper}>
                <UlText style={st.text}>{message}</UlText>
            </View>
            <View style={st.iconWrapper}>
                <ChecklistIcon color={"rgba(255,255,255,0.8)"} size={26} />
            </View>
        </View>
    )
}


const ErrorToast = (props) => {
    let { message } = props

    return (
        <View style={[st.wrapper, { backgroundColor: "rgba(206,51,51,0.9)" }]}>
            <View style={st.indicator} />
            <View style={st.textWrapper}>
                <UlText style={st.text}>{message}</UlText>
            </View>
            <View style={st.iconWrapper}>
                {/* <UlCustomIcon name="fog-circle-info-bold" color={"rgba(255,255,255,0.8)"} size={26} /> */}
            </View>
        </View>
    )
}


const WarningToast = (props) => {
    let { message } = props

    return (
        <View style={[st.wrapper, { backgroundColor: "rgba(206,140,39,0.9)" }]}>
            <View style={st.indicator} />
            <View style={st.textWrapper}>
                <UlText style={st.text}>{message}</UlText>
            </View>
            <View style={st.iconWrapper}>
                {/* <UlCustomIcon name="fog-circle-info-bold" color={"rgba(255,255,255,0.8)"} size={26} /> */}
            </View>
        </View>
    )
}


const st = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        width: "95%",
        marginTop: 10,
        borderRadius: 10,
        overflow: "hidden",
    },
    indicator: {
        height: 60,
        width: 10,
        backgroundColor: "rgba(255,255,255,0.3)",
    },

    textWrapper: {
        flex: 1,
        justifyContent: "center",
        textAlign: "start",
        paddingLeft: 15,
    },
    text: {
        color: "#fff",
        fontSize: 20,
    },

    iconWrapper: {
        paddingRight: 20,
        alignItems: "center",
        justifyContent: "center",
    },
})
