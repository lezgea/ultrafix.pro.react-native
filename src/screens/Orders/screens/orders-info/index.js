import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Linking } from "react-native";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import { ApplianceInfoCard, OrderButtons, ServiceInfoCard } from "../../components";
import { getOrderInfo, getServices } from "../../../../api";
import { OrdersInfoStyles as st } from "../../styles";
import { UlBlueCircleButton, UlContentLoader, UlDeleteModal, UlHeader } from "../../../../components";
import Appliances from "../../../../plugins/appliances";
import { FilledCallIcon, GoogleMapIcon, IconGoogleMap } from "../../../../assets";
import getDirections from "../../../../utils/google-map-directions";


export default function OrdersInfoScreen({ route, navigation }) {
    let { id, label } = route.params

    const [headerColor, setHeaderColor] = useState(label.color)
    const [state, setState] = useReducer(
        (prevState, newState) => {
            return { ...prevState, ...newState };
        },
        {
            orderInfo: {},
            appliance: "",
            loading: true,
            refreshing: false,
        },
    )
    const [params, setParams] = useReducer(
        (prevState, newState) => {
            return { ...prevState, ...newState };
        },
        {
            id: id,
        },
    )
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    async function loadData() {
        // setState({ loading: true })
        // let response = await getOrderInfo({ id: id })
        // if (response.status === "success") {
        //     setState({ orderInfo: response.data })
        // }
        // setState({ loading: false })
    }

    function onPressEdit() {
        navigation.navigate("orders-edit", { id: id })
    }

    function onPressDelete() {
    }


    const handleGetDirections = async () => {
        let wayPoints = [{ latitude: state.orderInfo?.latitude, longitude: state.orderInfo?.longitude }]
        await getDirections({
            // destination: wayPoints[wayPoints.length - 1],
            params: [
                {
                    key: "travelmode",
                    value: "driving",        // may be "walking", "bicycling" or "transit" as well
                },
                {
                    key: "dir_action",
                    value: "navigate"       // this instantly initializes navigation using the given travel mode
                }
            ],
            waypoints: wayPoints,
        })
    }


    function onCall() {
        Linking.openURL(`tel:${state.orderInfo?.customer_phone}`)
    }


    React.useEffect(() => {
        loadData()
    }, [id])


    return (
        <View style={st.container}>
            <UlHeader
                label={`Order - #${state.orderInfo?.ticket_num || ""}`}
                showBackBtn
                color={headerColor}
                navigation={navigation}
            // actionSheet={{
            //     actions: [
            //         {label: "Edit", style: {}, onPress: onPressEdit},
            //         {label: "Delete", style: {color: "red"}, onPress: onPressDelete},
            //     ]
            // }}
            />
            <UlContentLoader loading={state.loading}>
                <OrderButtons
                    state={state}
                    headerColor={headerColor}
                    setHeaderColor={setHeaderColor}
                    navigation={navigation}
                />
                <ScrollView contentContainerStyle={st.cardsWrapper}>
                    <ServiceInfoCard info={state.orderInfo} {...route.params} />
                    {
                        state.orderInfo?.appliances?.map((item, index) =>
                            <ApplianceInfoCard
                                key={index}
                                info={item}
                                label={`${Appliances.title(item.service_id)}`}
                                problem={state.orderInfo?.problem_description}
                            />
                        )
                    }
                </ScrollView>

                <UlDeleteModal visible={deleteModalVisible} onClose={() => setDeleteModalVisible(false)} />
            </UlContentLoader>

            <View
                style={{
                    position: "absolute",
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    bottom: 20,
                }}
            >
                <TouchableOpacity style={st.mapBtn} onPress={handleGetDirections}>
                    <GoogleMapIcon size={35} />
                </TouchableOpacity>
                <TouchableOpacity style={st.addBtn} onPress={onCall}>
                    <FilledCallIcon size={35} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
