import React from 'react'
import {StyleSheet} from "react-native";
import {TouchableOpacity} from "react-native";
import {CloseIcon} from "native-base";
import {UlText} from "../../../../components";


export const SelectedItem = (props) => {
    let {item, onClick} = props
    return(
        <TouchableOpacity style={st.wrapper} onPress={onClick}>
            <UlText style={st.title}>{item.label}</UlText>
            <CloseIcon style={st.icon}/>
        </TouchableOpacity>
    )
}


const st = StyleSheet.create({
    wrapper: {
        maxWidth: "50%",
        minWidth: "28%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 10,
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: "rgb(13,152,140)",
    },
    title: {
        color: "#fff",
        fontSize: 18,
        marginRight: 10,
    },
    icon: {
        color: '#fff',
    }
})
