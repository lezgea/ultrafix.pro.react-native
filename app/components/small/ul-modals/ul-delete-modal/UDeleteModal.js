import React from "react";
import { View, StyleSheet } from "react-native"
import { UlCustomModal } from "../ul-custom-modal/UCustomModal";
import { UlGrayButton, UlRedButton, UlText } from "../../../index";


export const UlDeleteModal = (props) => {
    let { visible, onClose } = props;

    return (
        <UlCustomModal visible={visible} label={"Confirm to delete"} onClose={onClose}>
            <View style={{ alignItems: "center" }}>
                <UlText style={{ fontSize: 24, fontWeight: "600", marginBottom: 20, marginTop: 20 }}>Are You Sure ?</UlText>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <UlRedButton label="Yes, delete it" style={{ flex: 4, width: "47%", marginRight: 15 }} />
                    <UlGrayButton label="No, cancel" style={{ flex: 3, width: "47%", }} onPress={onClose} />
                </View>
            </View>
        </UlCustomModal>
    )
}
