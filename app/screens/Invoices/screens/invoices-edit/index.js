import React from "react";
import { View, ScrollView } from "react-native";
import {
    UlBlueButton,
    UlBlueCircleButton,
    UlCard,
    UlContentLoader,
    UlDarkBlueButton,
    UlFormInput,
    UlFormSelect,
    UlGrayButton,
    UlHeader,
    UlRedCircleButton,
    UlText,
} from "../../../../components";
import { InvoicesEditStyles as st } from '../../styles/invoices-edit'
import * as Animatable from "react-native-animatable";
import { Box, Divider, HStack, Icon, Pressable, Spacer } from "native-base";
import { getInvoiceInfo, getInvoiceTypes, onInvoiceUpdate } from "../../../../api";
import { useToast } from "react-native-toast-notifications";


export default function InvoicesEditScreen({ route, navigation }) {
    let { id } = route.params;
    const toast = useToast()

    const [state, setState] = React.useReducer(
        (prevState, newState) => {
            return { ...prevState, ...newState };
        },
        {
            id: id,
            params: {},
            invoiceInfo: {},
            orderInfo: {},
            typesList: [],
            appliance: "",
            loading: false,
            refreshing: false,
        }
    )


    const [params, setParams] = React.useReducer(
        (prevState, newState) => {
            return { ...prevState, ...newState };
        },
        {
            total_amount: 0,
            work_description: 0,
            repair_quote: 0,
            deposit: 0,
            balance: 0,
            payments: [],
        }
    )


    function onAddPayment() {
        setParams({
            payments: [
                ...params.payments,
                {
                    type: 0,
                    data: "test",
                    amount: 0,
                }
            ]
        })
    }


    function onRemovePayment(index) {
        let paymentTypes = params.payments
        paymentTypes.splice(index, 1)
        setParams({
            payments: [
                ...paymentTypes,
            ]
        })
    }

    function onSelectPaymentType(value, index) {
        let paymentTypes = params.payments
        paymentTypes[index].type = value
        setParams({ payments: paymentTypes })
    }

    function onChangePaymentAmount(value, index) {
        let paymentTypes = params.payments
        paymentTypes[index].amount = value
        setParams({ payments: paymentTypes })
    }

    function onChangePaymentDetails(value, index) {
        let paymentTypes = params.payments
        paymentTypes[index].data = value
        setParams({ payments: paymentTypes })
    }

    async function loadInvoiceTypes() {
        let response = await getInvoiceTypes({})
        if (response.status === 'success') {
            setState({
                typesList: [...response.data.map(
                    item => ({ label: item.value.toUpperCase(), value: item.id })
                )]
            })
        }
    }

    async function loadInvoiceInfo() {
        setState({ loading: true })
        let response = await getInvoiceInfo({ id: id })
        if (response.status === "success") {
            setParams({
                total_amount: response.data?.total_amount || 0,
                work_description: response.data?.work_description,
                repair_quote: response.data?.repair_quote || 0,
                deposit: response.data?.deposit || 0,
                balance: response.data?.balance || 0,
                payments: !!response.data?.payment_types?.length ? [
                    ...response.data?.payment_types?.map((item, i) => ({
                        type: item.id,
                        data: response.data?.payment_datas[i],
                        amount: 0,
                    }))
                ] : [],
            })
            setState({ loading: false })
            return
        }
        setTimeout(() => setState({ loading: false }), 1000)
    }

    async function onUpdateInvoice() {
        let response = await onInvoiceUpdate({
            total_amount: Number(params.total_amount),
            work_description: params.work_description,
            repair_quote: Number(params.repair_quote),
            deposit: Number(params.deposit),
            balance: Number(params.balance),
            payments: [...params.payments],
            id: id,
        })
        if (response.status === "success") {
            toast.show("Updated Successfully!", { type: "success" })
            navigation.goBack()
        } else {
            toast.show(response.message || response.description, { type: "error" })
        }

    }


    React.useEffect(() => {
        loadInvoiceTypes()
        loadInvoiceInfo()
    }, [id])



    return (
        <View style={st.container}>
            <UlHeader label="Invoice Update" navigation={navigation} showBackBtn />
            <UlContentLoader loading={state.loading}>
                <ScrollView contentContainerStyle={st.cardsWrapper}>
                    <Animatable.View
                        animation="bounceInLeft"
                        easing="ease-in-out"
                        iterationCount="1"
                        duration={800}
                        delay={0}
                        style={st.card}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <UlFormInput
                                    label="Total Amount"
                                    defaultValue={params.total_amount?.toString()}
                                    value={params.total_amount?.toString()}
                                    onChangeText={(e) => setParams({ total_amount: e })}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <UlFormInput
                                    label="Repair Quote"
                                    defaultValue={params.repair_quote?.toString()}
                                    value={params.repair_quote?.toString()}
                                    onChangeText={(e) => setParams({ repair_quote: e })}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <UlFormInput
                                    label="Deposit"
                                    defaultValue={params.deposit?.toString()}
                                    value={params.deposit?.toString()}
                                    onChangeText={(e) => setParams({ deposit: e })}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <UlFormInput
                                    label="Balance"
                                    defaultValue={params.balance?.toString()}
                                    value={params.balance?.toString()}
                                    onChangeText={(e) => setParams({ balance: e })}
                                />
                            </View>
                        </View>
                    </Animatable.View>
                    <Animatable.View
                        animation="bounceInRight"
                        easing="ease-in-out"
                        iterationCount="1"
                        duration={800}
                        delay={40}
                        style={[st.card, { position: "relative", paddingVertical: 15, }]}
                    >
                        <View>
                            <UlText style={{ fontSize: 16, fontWeight: "500", marginBottom: 2, }}>Payments</UlText>
                            <UlText style={{ fontSize: 12, fontStyle: "italic", width: "90%", color: "#D8811C" }}>
                                The amount for a Credit card must be set including fee
                            </UlText>
                        </View>
                        <View style={{ position: "absolute", right: 13, top: 13 }}>
                            <UlBlueCircleButton
                                size={38}
                                icon="fog-plus-bold"
                                onPress={onAddPayment}
                            />
                        </View>
                    </Animatable.View>

                    {
                        !!params.payments?.length && params.payments?.map((item, i) =>
                            <Animatable.View
                                animation="bounceInLeft"
                                easing="ease-in-out"
                                iterationCount="1"
                                duration={800}
                                delay={80}
                                style={st.card}
                            >
                                <View style={{ position: "absolute", right: 13, top: 13, zIndex: 5, }}>
                                    <UlRedCircleButton
                                        size={38}
                                        icon="fog-minus-bold"
                                        onPress={() => onRemovePayment(i)}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 3, marginRight: 10 }}>
                                        <UlFormSelect
                                            label="Type"
                                            value={item.type}
                                            defaultValue={item.type}
                                            options={state.typesList}
                                            onValueChange={(e) => onSelectPaymentType(e, i)}
                                        />
                                    </View>
                                    <View style={{ flex: 4 }}>
                                        <UlFormInput
                                            label="Amount"
                                            defaultValue={item.amount?.toString()}
                                            value={item.amount?.toString()}
                                            onChangeText={(e) => onChangePaymentAmount(e, i)}
                                        />
                                    </View>
                                </View>
                                <HStack space={3} justifyContent="center">
                                    <UlFormInput
                                        label="Details"
                                        defaultValue={item.data}
                                        value={item.data}
                                        onChangeText={(e) => onChangePaymentDetails(e, i)}
                                    />
                                </HStack>
                            </Animatable.View>
                        )
                    }

                    <Animatable.View
                        animation="bounceInRight"
                        easing="ease-in-out"
                        iterationCount="1"
                        duration={800}
                        delay={120}
                        style={st.card}
                    >
                        <HStack space={3} justifyContent="center">
                            <UlFormInput
                                textarea
                                h={40}
                                label="Performed Work Details"
                                defaultValue={params.work_description}
                                value={params.work_description}
                                onChangeText={(e) => setParams({ work_description: e })}
                            />
                        </HStack>
                    </Animatable.View>
                </ScrollView>

                <Animatable.View
                    animation="bounceInRight"
                    easing="ease-in-out"
                    iterationCount="1"
                    duration={800}
                    delay={10}
                    style={st.bottomButtonsWrapper}
                >
                    <View style={{ width: "100%", zIndex: 3 }}>
                        <View style={st.buttonsRow}>
                            <View style={{ flex: 1, padding: 5, }}>
                                <UlGrayButton
                                    label="Cancel"
                                    style={{ height: 40 }}
                                    onPress={() => navigation.goBack()}
                                />
                            </View>
                            <View style={{ flex: 1, padding: 5 }}>
                                <UlBlueButton
                                    label="Save"
                                    style={{ height: 40 }}
                                    onPress={onUpdateInvoice}
                                />
                            </View>
                        </View>
                    </View>
                </Animatable.View>

            </UlContentLoader>
        </View >
    )
}


