import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { UlText } from "../../ul-text";


export const UlSelectButton = (props) => {
    let { label, icon = false, iconSize, iconColor, selected, onPress, labelStyle, containerStyle, } = props;

    return (
        <TouchableOpacity
            style={[st.btnContainer, { ...containerStyle }, selected && { backgroundColor: "#0695e7" }]}
            onPress={onPress}
        >
            {
                // icon
                //     ? <UlCustomIcon name={icon} color={iconColor} size={iconSize} />
                //     :

                <UlText style={[st.btnLabel, { ...labelStyle }, selected && { color: "#fff" }]}>{label}</UlText>
            }
        </TouchableOpacity>
    )
}


const st = StyleSheet.create({
    btnContainer: {
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
        height: 30,
        borderRadius: 5,
        backgroundColor: "#fff",
    },
    btnLabel: {
        fontSize: 16,
        fontWeight: "500",
        color: "#7E7E7E",
    },
})
