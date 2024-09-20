import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { STATUSES } from "../../../../constants";
import { updateOrderStatus } from "../../../../api";
import { getLabelById } from "@screens/Orders/actions";
import { AlertDialog, Button } from "native-base";
import { UlBlueButton, UlFormSelect, UlGreenButton, UlPinkButton } from "../../../../components";
import variables from "../../../../config/variables";
import * as Animatable from "react-native-animatable";



export const OrderButtons = (props) => {
    let { state, headerColor, setHeaderColor, navigation, onPressShowMore } = props;
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

    async function changeOrderStatus() {
        changeStatusColor()
        await updateOrderStatus(newStatusId, state.orderInfo?.id)
    }


    return (
        <View style={st.filtersWrapper}>
            <View style={{ width: "100%", zIndex: 3 }}>
                <Animatable.View
                    animation="fadeInLeft"
                    easing="ease-in-out"
                    iterationCount="1"
                    duration={500}
                    style={[st.filtersRow, { paddingTop: 0, backgroundColor: headerColor }]}
                >
                    <View style={{ flex: 1, padding: 5 }}>
                        <UlFormSelect
                            placeholder={getLabelById(state.orderInfo?.status).label}
                            defaultValue={state.orderInfo?.status}
                            options={STATUSES}
                            onValueChange={showAlert}
                            placeholderTextColor={"#fff"}
                            style={{ color: "#fff" }}
                        />
                    </View>
                </Animatable.View>
                <Animatable.View
                    animation="bounceInRight"
                    easing="ease-in-out"
                    iterationCount="1"
                    duration={800}
                    delay={30}
                    style={st.filtersRow}
                >
                    <View style={{ flex: 1, padding: 5 }}>
                        <UlGreenButton
                            label="Invoice"
                            style={{ height: 40 }}
                            onPress={() => navigation.navigate("InvoicesInfo", { id: state?.orderInfo?.report?.id })}
                        />
                    </View>
                    <View style={{ flex: 1, padding: 5, }}>
                        <UlBlueButton
                            label="Report"
                            style={{ height: 40 }}
                            onPress={() => navigation.navigate("ReportsInfo", { id: state?.orderInfo?.report?.id })}
                        />
                    </View>
                    <View style={{ flex: 1, padding: 5, }}>
                        <UlPinkButton
                            label="Photos"
                            style={{ height: 40 }}
                            onPress={() => navigation.navigate("OrdersPhotos", { id: state?.orderInfo?.id })}
                        />
                    </View>
                </Animatable.View>
            </View>

            <AlertDialog isOpen={alertVisible} onClose={closeAlert}>
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>Are you sure ?</AlertDialog.Header>
                    <AlertDialog.Body style={{ alignItems: "center" }}>
                        Order status will be updated
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button variant="unstyled" width={150} colorScheme="coolGray" onPress={closeAlert} >
                                Cancel
                            </Button>
                            <Button colorScheme="primary" width={120} onPress={changeOrderStatus}>
                                Yes
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </View>
    )
}


const st = StyleSheet.create({
    filtersWrapper: {
        width: "100%",
        top: variables.headerHeight + 10,
        zIndex: 5,
        // paddingVertical: 5,
        position: "absolute",
        alignItems: "flex-end",
        backgroundColor: "rgba(233,235,236,0.7)",
    },
    filtersRow: {
        flex: 1,
        paddingHorizontal: 5,
        paddingTop: 5,
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

