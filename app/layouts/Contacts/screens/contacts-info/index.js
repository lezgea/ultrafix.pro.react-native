import {ScrollView, StyleSheet, Text, TouchableOpacity, View, Linking} from "react-native";
import React, {useEffect, useMemo, useReducer, useState} from "react";
import {getContactInfo, getOrderInfo, getServices} from "../../../../api";
import {UlContentLoader, UlDeleteModal, UlHeader, UlText} from "../../../../components";
import {ContactsInfoStyles as st} from "../../styles/contact-info";


export default function ContactsInfoScreen ({route, navigation}) {
    let {id} = route.params

    const [state, setState] = useReducer(
        (prevState, newState) => {
            return { ...prevState, ...newState };
        },
        {
            data: {},
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


    async function loadData() {
        setState({loading: true})
        let response = await getContactInfo({id: id})
        if(response.status === "success") {
            setState({data: response.data})
        }
        setState({loading: false})
    }


    React.useEffect(() => {
        loadData()
    }, [id])


    return(
        <View style={st.container}>
            <UlHeader
                label="Contact Info"
                showBackBtn
                navigation={navigation}
            />
            <UlContentLoader loading={state.loading}>
                <View>
                    <UlText>{JSON.stringify(state.data)}</UlText>
                </View>
            </UlContentLoader>
        </View>
    )
}
