import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {IconArrowMoveLeft} from "../../../assets";
import React from "react";


export const UlNavBar = (props) => {
    let {label, navigation, onSwitchView} = props;

    return(
        <View style={st.navBar}>
            <TouchableOpacity style={st.switchBtn} onPress={() => navigation.goBack()}>
                <IconArrowMoveLeft width={20} height={20}/>
            </TouchableOpacity>
            <View style={{flex: 1, marginLeft: 15, marginBottom: 5}}>
                <Text style={st.screenLabel}>{label}</Text>
            </View>
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity style={st.switchBtn} onPress={() => {}}>
                </TouchableOpacity>
                <TouchableOpacity style={st.switchBtn} onPress={onSwitchView}>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const st = StyleSheet.create({
    navBar: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingTop: 50,
        backgroundColor: "#fff",
        paddingBottom: 10,
        paddingHorizontal: 10,
    },
    screenLabel: {
        fontSize: 24,
        fontWeight: "600",
    },
    switchBtn: {
        alignItems: "center",
        justifyContent: "center",
        width: 45,
        height: 45,
        marginLeft: 5,
        borderRadius: 30,
        backgroundColor: "#D9D9D9",
    },
})
