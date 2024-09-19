import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { updateOrder, updateOrderStatus } from "../../../../api";
import { getLabelById } from "../../../Orders/actions";
import { UlBlackButton, UlGreenButton, UlPinkButton } from "../../../../components";
import variables from "../../../../config/variables";
import * as Animatable from "react-native-animatable";


export const InvoiceInfoButtons = (props) => {
    let { state, headerColor, setHeaderColor, navigation, onEmailPress, onTextPress } = props;
    const [alertVisible, setAlertVisible] = useState(false)
    const [newStatusId, setNewStatusId] = useState(0)

    function showAlert(statusId) {
        setAlertVisible(true)
        setNewStatusId(statusId)
    }

    function closeAlert() {
        setAlertVisible(!alertVisible)
    }

    function changeStatusColor() {
        let labelColor = getLabelById(newStatusId).color
        setHeaderColor(labelColor)
        closeAlert()
    }


    return (
        <Animatable.View
            animation="bounceInRight"
            easing="ease-in-out"
            iterationCount="1"
            duration={800}
            delay={10}
            style={st.filtersWrapper}
        >
            <View style={{ width: "100%", zIndex: 3 }}>
                <View style={st.filtersRow}>
                    <View style={{ flex: 1, padding: 5, }}>
                        <UlGreenButton
                            label="View"
                            style={{ height: 40 }}
                            onPress={() => navigation.navigate("InvoicesView", { data: state })}
                        />
                    </View>
                    <View style={{ flex: 1, padding: 5, }}>
                        <UlPinkButton
                            label="E-mail"
                            style={{ height: 40 }}
                            onPress={onEmailPress}
                        />
                    </View>
                    <View style={{ flex: 1, padding: 5, }}>
                        <UlBlackButton
                            label="Text"
                            style={{ height: 40 }}
                            onPress={onTextPress}
                        />
                    </View>
                </View>
            </View>
        </Animatable.View>
    )
}


const st = StyleSheet.create({
    filtersWrapper: {
        width: "100%",
        top: variables.headerHeight + 10,
        zIndex: 5,
        paddingVertical: 5,
        position: "absolute",
        alignItems: "flex-end",
        backgroundColor: "rgba(233,235,236,0.7)",
    },
    filtersRow: {
        flex: 1,
        paddingHorizontal: 5,
        flexDirection: "row",
    },

    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
})

