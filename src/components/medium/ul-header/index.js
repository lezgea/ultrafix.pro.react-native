import { Text, TouchableOpacity, View, StyleSheet, Modal, Image } from "react-native";
import React, { useState } from "react";
import { UlBlueButton, UlText } from "../../small";
import { Actionsheet, useDisclose } from "native-base";
import variables from "../../../config/variables";
import * as Animatable from "react-native-animatable";
import { FilledEllipsisVerticalIcon, FilledMenuGridIcon, FilledMenuListIcon, LeftIcon, SearchIcon } from "@assets/icons";


export const UlHeader = (props) => {
    let {
        label,
        color,
        showLogo,
        actionSheet,
        navigation,
        showFilterBtn = false,
        showSwitchViewBtn = false,
        showSignOut = false,
        showBackBtn = false,
        tabView,
        onSwitchView,
        signOutLoading,
        signOutIconSize,
        onShowFilters = () => { },
        onClickSignOut = () => { },
    } = props;

    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();


    return (
        <View style={[st.header, color && { backgroundColor: color, borderBottomColor: color }]}>
            {
                showLogo &&
                <Animatable.View
                    animation="bounceIn"
                    easing="ease-in-out"
                    iterationCount="1"
                    delay={1500}
                    duration={400}
                >
                    <Image style={{ marginLeft: 10, height: 40, width: 120 }} source={require("../../../assets/img/logo.png")} />
                </Animatable.View>
            }
            {
                showBackBtn &&
                <TouchableOpacity
                    style={[st.switchBtn, color && { backgroundColor: "rgba(255,255,255,0.3)" }]}
                    onPress={() => navigation.goBack()}
                >
                    <LeftIcon size={20} color={color ? "#fff" : "#a9a9a9"} />
                </TouchableOpacity>
            }
            <View style={{ flex: 1, marginLeft: 15, marginBottom: 5 }}>
                <Text style={[st.screenLabel, color && { color: "#fff" }]}>{label}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                {
                    showFilterBtn &&
                    <TouchableOpacity style={st.switchBtn} onPress={onShowFilters}>
                        <SearchIcon size={20} color={"#a9a9a9"} />
                    </TouchableOpacity>
                }
                {
                    showSwitchViewBtn &&
                    <TouchableOpacity style={[st.switchBtn, { marginLeft: 10 }]} onPress={onSwitchView}>
                        {tabView
                            ? <FilledMenuListIcon size={20} color={"#a9a9a9"} />
                            : <FilledMenuGridIcon size={20} color={"#a9a9a9"} />
                        }
                    </TouchableOpacity>
                }
            </View>
            {
                !!actionSheet &&
                <>
                    <TouchableOpacity style={{ marginBottom: 10 }} onPress={onOpen}>
                        <FilledEllipsisVerticalIcon size={18} color={"#fff"} />
                    </TouchableOpacity>
                    <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
                        <Actionsheet.Content>
                            {
                                actionSheet.actions?.map((action, i) =>
                                    <Actionsheet.Item key={i} onPress={() => { action.onPress(); onClose() }}>
                                        <UlText style={[{ fontSize: 18 }, action.style]}>{action.label}</UlText>
                                    </Actionsheet.Item>
                                )
                            }
                        </Actionsheet.Content>
                    </Actionsheet>
                </>
            }
            {
                showSignOut &&
                <Animatable.View
                    animation="bounceIn"
                    easing="ease-in-out"
                    iterationCount="1"
                    delay={1500}
                    duration={400}
                >
                    <UlBlueButton
                        label="Sign Out"
                        signOutIconSize={signOutIconSize}
                        loading={signOutLoading}
                        onPress={onClickSignOut}
                        style={{ height: 33, width: 90, borderRadius: 8, marginRight: 4 }}
                        labelStyle={{ fontSize: 15 }}
                    />
                </Animatable.View>
            }
        </View>
    )
}


const st = StyleSheet.create({
    header: {
        position: "absolute",
        zIndex: 10,
        width: "100%",
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingTop: 50,
        minHeight: variables.headerHeight,
        borderBottomWidth: 1,
        borderBottomColor: "#dedede",
        borderBottomStyle: "solid",
        backgroundColor: "#fff",
        paddingBottom: 10,
        paddingHorizontal: 10,
    },
    screenLabel: {
        fontSize: 20,
        fontWeight: "600",
    },
    switchBtn: {
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        marginLeft: 5,
        borderRadius: 30,
        backgroundColor: "rgba(217,217,217,0.34)",
    },
    signOutBtn: {
        alignItems: "center",
        justifyContent: "center",
        height: 35,
        paddingHorizontal: 15,
        marginLeft: 10,
        borderRadius: 30,
        backgroundColor: "#0988c7",
    },
})
