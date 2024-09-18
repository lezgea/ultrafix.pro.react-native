import React from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import UlCustomIcon from "../../ul-custom-icon";
import { UlText } from "../../ul-text";


export const UlCustomModal = (props) => {
    let { visible, label, children, mainStyle, onClose } = props;

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                backdropOpacity={0.3}
                visible={visible}
                onRequestClose={() => {
                    onClose()
                    // Alert.alert("Modal has been closed.");
                    // setModalVisible(!modalVisible);
                }}

            >
                <View style={[st.mainContainer, { ...mainStyle }]}>
                    <View style={st.modalContainer}>
                        <View style={st.headerContainer}>
                            <UlText style={{ fontSize: 18, marginTop: 5, color: "#959DA0" }}>{label}</UlText>
                            <TouchableOpacity style={{ position: "absolute", right: 20 }} onPress={onClose}>
                                <UlCustomIcon name="fog-x" color={"#a4a4a4"} size={15} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ padding: 20 }}>
                            {children}
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}



const st = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        paddingHorizontal: 25,
        // paddingVertical: 100,
    },
    modalContainer: {
        // flex: 1,
        zIndex: 1,
        borderRadius: 10,
        width: "100%",
        backgroundColor: "#fff",
    },

    headerContainer: {
        height: 50,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: "#dedede",
    },

    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
})
