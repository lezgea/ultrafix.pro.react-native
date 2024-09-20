import React, { useState, useRef } from "react";
import { View, ScrollView, Linking } from "react-native";
import PriceC from "../../../../plugins/price-c";
import { InvoiceInfoButtons, OrderInfoCard } from "../../components";
import moment from "moment";
import SignatureScreen from "react-native-signature-canvas";
import {
    UlBlueButton,
    UlContentLoader,
    UlDarkBlueButton, UlFormInput, UlGrayButton,
    UlHeader,
    UlText,
} from "../../../../components";
import { InvoicesInfoStyles as st } from "../../styles/invoices-info";
import VX from "../../../../plugins/vx";
import { getInvoiceInfo, getOrderInfo, onSendEmail, onSendText, updateInvoiceSignature } from "../../../../api";
import Appliances from "../../../../plugins/appliances";
import * as Animatable from "react-native-animatable";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { useToast } from "react-native-toast-notifications";
import { CheckIcon } from "@assets/icons";
import { UlCustomModal } from "@components/small/ul-modals/ul-custom-modal/UCustomModal";


export default function InvoicesInfoScreen({ route, navigation }) {
    let { id, color } = route.params;

    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [signature, setSignature] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const invoiceID = React.useRef()
    const orderID = React.useRef()
    const ref = useRef();
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
            appliance: "",
            email: "",
            loading: false,
            refreshing: false,
            showEmailModal: false,
            showTextModal: false,
        }
    )

    const [params, setParams] = React.useReducer(
        (prevState, newState) => {
            return { ...prevState, ...newState };
        },
        {
            email: '',
            pdf: '',
            number: '',
        }
    )

    // Called after ref.current.readSignature() reads a non-empty base64 string
    const handleOK = (signature) => {
        setSignature(signature);
        // onOK(signature); // Callback from Component props
    };

    // Called after ref.current.readSignature() reads an empty string
    const handleEmpty = () => {
    };

    // Called after ref.current.clearSignature()
    const handleClear = () => {
    };

    // Called after end of stroke
    const handleEnd = () => {
        setScrollEnabled(true);
        ref.current.readSignature();
    };

    // Called after ref.current.getData()
    const handleData = (data) => {
        console.log(data);
    };

    function closeAlert() {
        setAlertVisible(!alertVisible);
    }

    const updateSign = async () => {
        let response = await updateInvoiceSignature({ id: state.id, signature: signature })
        if (response.status === "success") {
            closeAlert()
            await loadInvoiceData()
            await loadOrderData()
        }
    }

    async function loadInvoiceData(ID) {
        setState({ loading: true })
        let response = await getInvoiceInfo({ id: ID })
        if (response.status === "success") {
            setState({
                invoiceInfo: response.data,
                orderId: response.data?.order_id,
            })
            return
        }
        setState({ invoiceInfo: {} })
    }


    async function loadOrderData(ID) {
        try {
            const response = await getOrderInfo({ id: ID || state.orderId });
            orderID.current = state.orderId;
            if (response.status === "success") {
                setState({
                    orderInfo: response.data,
                    loading: false,
                })
                setParams({
                    number: response.data?.customer_phone
                })
            } else {
                setTimeout(() => setState({ loading: false }), 1000);
            }

        } catch (error) {
            console.error("Failed to load order data:", error);
            setState({ loading: false });
        }
    }


    async function onSign() {
        if (!signature) {
            alert("Please sign to submit")
            return
        }
        await updateSign()
    }



    let date = moment(state.invoiceInfo?.created_at).format("YYYY-MM-DD")
    let technician = !!state.orderInfo?.technichians?.length ? state.orderInfo?.technichians[0]?.name : "-"
    let appliance = !!state.orderInfo?.appliances?.length && Appliances.title(state.orderInfo?.appliances[0]?.service_id)
    let brand = !!state.orderInfo?.appliances?.length ? (state.orderInfo?.appliances[0]?.brand || "-") : "-"



    const onEmailSend = async () => {
        let options = {
            html: ourHtml,
            fileName: 'test',
            base64: true,
            directory: 'Documents',
        }
        let file = await RNHTMLtoPDF.convert(options)

        if (!!file.base64) {
            let response = await onSendEmail({
                id: state.invoiceInfo?.id,
                email: params.email,
                pdf: file.base64,
            })
            if (response.status === 'success') {
                toast.show(
                    "Sent Successfully!",
                    { type: "success" }
                )
            } else {
                toast.show(
                    response.message || response.description || "Something went wrong",
                    { type: "error" }
                )
            }
            setState({ showEmailModal: false })
        }
    }


    const onTextSend = async () => {
        let response = await onSendText({
            id: state.invoiceInfo?.id,
            number: params.number,
            // number: '222-222-2222',
        })
        console.log('!!!!!!', response)
        if (response.status === 'success') {
            toast.show(
                "Sent Successfully!",
                { type: "success" }
            )
        } else {
            toast.show(
                response.message || response.description || "Something went wrong",
                { type: "error" }
            )
        }
        setState({ showTextModal: false })
    }


    React.useEffect(() => {
        loadInvoiceData(id)
        invoiceID.current = id
    }, [id])


    React.useEffect(() => {
        loadOrderData()
    }, [state.orderId])


    React.useEffect(() => {
        navigation.addListener('focus', async () => {
            setState({ ...state, loading: true })
            await loadInvoiceData(invoiceID.current)
            await loadOrderData(orderID.current)
        });
    }, [navigation])


    return (
        <View style={st.container}>
            <UlHeader label="Invoice Info" navigation={navigation} showBackBtn />
            <UlContentLoader loading={state.loading}>
                <InvoiceInfoButtons
                    state={state}
                    navigation={navigation}
                    onEmailPress={() => setState({ showEmailModal: true })}
                    onTextPress={() => setState({ showTextModal: true })}
                />

                <ScrollView contentContainerStyle={st.cardsWrapper}>
                    {/***  -------------  INFO CARD  **!/*/}
                    <Animatable.View
                        animation="bounceInLeft"
                        easing="ease-in-out"
                        iterationCount="1"
                        duration={800}
                        style={st.infoCard}
                    >
                        <View style={st.infoCardHeader}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                {
                                    state.invoiceInfo?.status?.value === "paid"
                                        ? <CheckIcon size={25} color="#00A2FF" />
                                        : <CheckIcon size={25} color="#dedede" />

                                }
                                <UlText style={st.label}>{state.invoiceInfo?.status?.trans}</UlText>
                            </View>
                            <UlText style={{ fontSize: 22, fontWeight: "700" }}>
                                #{state.invoiceInfo?.ticket_num}
                            </UlText>
                        </View>
                        <View style={st.infoCardContent}>
                            <InfoLine
                                index={0}
                                label="Date"
                                value={moment(date).format("YYYY-MM-DD")}
                            />
                            <InfoLine
                                index={1}
                                label="Name" value={state.invoiceInfo?.customer_name}
                                gray
                            />
                            <InfoLine
                                index={2}
                                label="Phone"
                                value={state.orderInfo?.customer_phone}
                            />
                            <InfoLine
                                index={3}
                                label="Address"
                                value={state.orderInfo?.address}
                                gray
                            />
                            <InfoLine
                                index={4}
                                label="Technicians"
                                value={
                                    state.orderInfo?.technichians?.length > 0
                                        ? state.orderInfo?.technichians[0].name
                                        : "-"
                                }
                            />
                            <InfoLine
                                index={5}
                                label="Ticket"
                                value={state.orderInfo?.ticket_num}
                                gray
                            />
                            <InfoLine
                                index={6}
                                label="Appliance"
                                value={Appliances.title(!!state.orderInfo?.appliances?.length ? state.orderInfo?.appliances[0]?.service_id : "")}
                            />
                            <InfoLine
                                index={7}
                                label="Brand"
                                value={
                                    !!state.orderInfo?.appliances?.length
                                        ? state.orderInfo?.appliances[0]?.brand
                                        : "-"
                                }
                                gray
                            />
                            <InfoLine
                                index={8}
                                label="Work Description"
                                value={state.invoiceInfo?.work_description}
                            />
                            <InfoLine
                                index={9}
                                label="Total Due"
                                value={`$ ${PriceC.convert(state.invoiceInfo?.total_amount)}`}
                                gray
                            />
                            <InfoLine
                                index={10}
                                label="Deposit"
                                value={`$ ${PriceC.convert(state.invoiceInfo?.deposit)}`}
                            />
                            <InfoLine
                                index={11}
                                label="Balance Due"
                                value={`$ ${PriceC.convert(state.invoiceInfo?.balance)}`}
                                gray
                            />
                        </View>
                    </Animatable.View>

                    {/* <OrderInfoCard
                        order={state.orderInfo}
                        navigation={navigation}
                    /> */}

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
                            {
                                !state.invoiceInfo?.signature &&
                                <View style={{ flex: 1, padding: 5, }}>
                                    <UlBlueButton
                                        loading={state.loading}
                                        label="Sign Invoice"
                                        onPress={() => {
                                            setAlertVisible(true);
                                        }}
                                        style={{ height: 40 }}
                                    />
                                </View>
                            }
                            <View style={{ flex: 1, padding: 5 }}>
                                <UlDarkBlueButton
                                    label="Update"
                                    style={{ height: 40 }}
                                    onPress={() => navigation.navigate("InvoicesEdit", { id: state.invoiceInfo?.id })}
                                />
                            </View>
                        </View>
                    </View>
                </Animatable.View>

                {/**  ---------  EMAIL MODAL / Sends invoice to the email address ------- */}
                <UlCustomModal
                    visible={state.showEmailModal}
                    label={"Send Invoice to Email"}
                    mainStyle={{ flex: 1 }}
                    onClose={() => setState({ showEmailModal: false })}
                >
                    <UlFormInput
                        label="Email"
                        defaultValue={params.email}
                        value={params.email}
                        autoCapitalize="none"
                        style={{ height: 45 }}
                        onChangeText={(e) => setParams({ email: e })}
                    />
                    <View style={{ marginTop: 5, flexDirection: "row" }}>
                        <UlGrayButton
                            label="Cancel"
                            style={{ flex: 1, height: 40, marginRight: 10 }}
                            onPress={() => setState({ showEmailModal: false })}
                        />
                        <UlBlueButton
                            label="Send Email"
                            style={{ flex: 3, height: 40 }}
                            onPress={onEmailSend}
                        />
                    </View>
                </UlCustomModal>


                {/**  ---------  TEXT MODAL / Sends text notification to the phone number  ------- */}
                <UlCustomModal
                    visible={state.showTextModal}
                    label={"Send Text to Number"}
                    mainStyle={{ flex: 1 }}
                    onClose={() => setState({ showTextModal: false })}
                >
                    <UlFormInput
                        label="Phone Number"
                        defaultValue={params.number}
                        value={params.number}
                        style={{ height: 45 }}
                        onChangeText={(e) => setParams({ number: e })}
                    />
                    <View style={{ marginTop: 5, flexDirection: "row" }}>
                        <UlGrayButton
                            label="Cancel"
                            style={{ flex: 1, height: 40, marginRight: 10 }}
                            onPress={() => setState({ showTextModal: false })}
                        />
                        <UlBlueButton
                            label="Send Text"
                            style={{ flex: 3, height: 40 }}
                            onPress={onTextSend}
                        />
                    </View>
                </UlCustomModal>



                <UlCustomModal
                    visible={alertVisible}
                    onClose={closeAlert}
                    mainStyle={{ paddingHorizontal: 0 }}
                >
                    <View style={{ height: VX.screenHeight() - 300 }}>
                        <SignatureScreen
                            style={{ height: 300 }}
                            ref={ref}
                            webStyle={`
                            .m-signature-pad--footer {display: none; margin: 0px;}
                            body,html {width: 100%; height: 600px;}
                            `}
                            onEnd={handleEnd}
                            onOK={handleOK}
                            onEmpty={handleEmpty}
                            onBegin={() => setScrollEnabled(false)}
                            onClear={handleClear}
                            onGetData={handleData}
                        />
                        <View style={{ flexDirection: "row", marginTop: 15 }}>
                            <UlGrayButton
                                style={{ flex: 1, height: 40 }}
                                label="Cancel"
                                onPress={closeAlert}
                            />
                            <UlBlueButton
                                style={{ flex: 2, marginLeft: 15, height: 40 }}
                                label="Submit"
                                onPress={onSign}
                            />
                        </View>
                    </View>
                </UlCustomModal>
            </UlContentLoader>
        </View>
    )
}


const InfoLine = (props) => {
    let { label, value, gray, index } = props
    let color = gray ? "rgba(239,239,239,0.71)" : "transparent"

    return (
        <Animatable.View
            key={index}
            animation="bounceInLeft"
            easing="ease-in-out"
            iterationCount="1"
            duration={800}
            delay={index * 30}
            style={{
                flexDirection: "row",
                paddingHorizontal: 10,
                backgroundColor: color,
            }}
        >
            <View style={{ width: "50%", justifyContent: "center" }}>
                <UlText style={{ fontSize: 16, color: "#8397a6" }}>{label}</UlText>
            </View>
            <View style={st.lineWrapper}>
                <UlText style={{ fontSize: 16, color: "#000000" }}>
                    {value || "-"}
                </UlText>
            </View>
        </Animatable.View>
    )
}


