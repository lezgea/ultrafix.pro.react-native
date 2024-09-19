import React from "react"
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {IconUser} from "../../../../assets";
import {UlText} from "../../../../components";


export const MessageCard = (props) => {
    let {index, title, message, date} = props

    return (
        <TouchableOpacity
            key={index}
            style={st.dialogueCard}
            // onPress={() => navigation.navigate("reports-info", {id: report.id, })}
        >
            <View style={st.userIconWrapper}>
                <IconUser width={45} height={45} />
            </View>
            <View style={st.textContainer}>
                <UlText style={st.phone}>{title}</UlText>
                <UlText style={st.message} numberOfLines={1}>{message}</UlText>
            </View>
            <UlText style={st.date}>{date}</UlText>
        </TouchableOpacity>
    );
};


const st = StyleSheet.create({
    dialogueCard: {
        flex: 1,
        flexDirection: "row",
        minWidth: "50%",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#e4e4e4",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    userIconWrapper: {
        borderWidth: 3,
        borderStyle: "solid",
        borderColor: "rgba(117,164,206,0.9)",
        borderRadius: 100,
        marginRight: 10,
    },
    textContainer: {
        width: "81%",
        justifyContent: "center",
    },
    phone: {
        fontWeight: "600",
        fontSize: 20,
        marginBottom: 3,
        color: "#000",
    },
    message: {
        fontSize: 16,
        color: "#808080",
    },
    date: {
        fontSize: 12,
        position: "absolute",
        top: 13,
        right: 15,
        fontWeight: "500",
        color: "#bbbbbb",
    }
});

