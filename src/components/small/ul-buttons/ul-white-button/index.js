import {Text, TouchableOpacity, StyleSheet} from "react-native";
import React from "react";
import {UlText} from "../../ul-text";


export const UlWhiteButton = (props) => {
    let {label, onPress} = props;

    return(
        <TouchableOpacity
            style={[st.btnContainer, {...props.style}]}
            onPress={onPress}
        >
            <UlText style={st.btnLabel}>{label}</UlText>
        </TouchableOpacity>
    )
}


const st = StyleSheet.create({
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 45,
        borderRadius: 5,
        paddingHorizontal: 16,
        paddingVertical: 7,
        backgroundColor: '#fff'
    },
    btnLabel: {
        fontSize: 18,
        color: 'rgb(6,149,231)',
        fontWeight: '600',
    },
})


