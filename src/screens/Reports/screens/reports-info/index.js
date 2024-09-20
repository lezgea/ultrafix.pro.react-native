import React from "react";
import { ScrollView, View } from "react-native";
import { UlHeader, UlContentLoader, UlText, UlInfoLine, UlDarkBlueButton, UlGreenButton } from "../../../../components";
import { getInvoiceInfo } from "../../../../api";
import { IconBlueCheck, IconGrayCheck } from "../../../../assets";
import PriceC from "../../../../plugins/price-c";
import { getLabelColor } from "@utils/get-label-color";
import { ReportsInfoStyles as st } from "../../styles";
import moment from "moment/moment";
import { useToast } from "react-native-toast-notifications";
import * as Animatable from "react-native-animatable";



export default function ReportsInfoScreen({ route, navigation }) {
    let { id, label } = route.params
    const toast = useToast()

    const [state, setState] = React.useReducer(
        (prevState, newState) => {
            return { ...prevState, ...newState };
        },
        {
            id: id,
            params: {},
            data: {},
            appliance: "",
            loading: false,
            refreshing: false,
        },
    )

    async function fetchReportInfo() {
        setState({ loading: true })
        let response = await getInvoiceInfo({ id: id })
        if (response.status === "success") {
            setState({ data: response.data, loading: false })
            return
        }
        setState({ data: {}, loading: false })
    }


    function onClickUpdate() {
        toast.show("Description!", { type: "success" })
    }


    let date = state.data?.created_at?.split(" ")[0]

    React.useEffect(() => {
        fetchReportInfo()
    }, [id])



    return (
        <View style={st.container}>
            <UlHeader
                label={`Report Info`}
                showBackBtn
                navigation={navigation}
            />
            <UlContentLoader loading={state.loading}>
                <ScrollView contentContainerStyle={st.cardsWrapper}>
                    {/***  -------------  INFO CARD  **/}
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
                                    state.data?.status?.value === "paid"
                                        ? <IconBlueCheck height={25} width={25} />
                                        : <IconGrayCheck height={25} width={25} />
                                }
                                <UlText style={st.label}>{state.data?.status?.trans}</UlText>
                            </View>
                            <UlText style={{ fontSize: 22, fontWeight: "600" }}>#{state.data?.ticket_num}</UlText>
                        </View>
                        <View style={st.infoCardContent}>
                            <UlInfoLine
                                index={0}
                                label="Customer"
                                value={state.data?.customer_name} />
                            <UlInfoLine
                                index={1}
                                label="Total Amount"
                                value={`$ ${PriceC.convert(state.data?.total_amount)}`}
                                gray
                            />
                            <UlInfoLine
                                index={2}
                                label="Parts Price"
                                value={`$ ${PriceC.convert(state.data?.parts_price)}`}
                            />
                            <UlInfoLine
                                index={3}
                                label="Expense"
                                value={`$ ${PriceC.convert(state.data?.company_expense)}`}
                                gray
                            />
                            <UlInfoLine
                                index={4}
                                label="Credit card fee"
                                value={`$ ${PriceC.convert(state.data?.total_fee)}`}
                            />
                            <UlInfoLine
                                index={5}
                                label="Total minus expenses"
                                value={`$ ${PriceC.convert(state.data?.total_minus_expense)}`}
                                gray
                            />
                            <UlInfoLine
                                index={6}
                                label="Employee percent"
                                value={`% ${state.data?.employee_percent}`}
                            />
                            <UlInfoLine
                                index={7}
                                label="Employee earning"
                                value={`$ ${PriceC.convert(state.data?.employee_earnings)}`}
                                gray
                            />
                            <UlInfoLine
                                index={8}
                                label="Deposit"
                                value={`$ ${PriceC.convert(state.data?.deposit)}`}
                            />
                            <UlInfoLine
                                index={9}
                                label="Balance"
                                value={`$ ${PriceC.convert(state.data?.balance)}`}
                                gray
                            />
                            <UlInfoLine
                                index={10}
                                label="Bonus"
                                value={`% ${state.data?.bonus || 0}`}
                            />
                            <UlInfoLine
                                index={11}
                                label="Description"
                                value={state.data?.description}
                                gray
                            />
                            <UlInfoLine
                                index={12}
                                label="Created at"
                                value={moment(date).format("YYYY-MM-DD")}
                            />
                        </View>
                    </Animatable.View>
                    {/***  -------------  PAYMENTS CARD  **/}
                    <Animatable.View
                        animation="bounceInLeft"
                        easing="ease-in-out"
                        iterationCount="1"
                        duration={800}
                        delay={30}
                        style={st.infoCard}
                    >
                        <View style={st.infoCardHeader}>
                            <UlText style={st.label}>Payments</UlText>
                        </View>
                        <View style={st.infoCardContent}>
                            {
                                state.data?.payment_types?.map((payment, i) =>
                                    <PaymentLine
                                        key={i}
                                        label={payment.value}
                                        description={state.data?.payment_datas[i]}
                                        value={`$ ${PriceC.convert(state.data?.cash)}`}
                                    />
                                )
                            }
                        </View>
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
                                <UlGreenButton
                                    loading={state.loading}
                                    label="Invoice"
                                    style={{ height: 40 }}
                                    onPress={() => navigation.navigate("InvoicesInfo", { id: state.data?.id })}
                                />
                            </View>
                            <View style={{ flex: 1, padding: 5 }}>
                                <UlDarkBlueButton
                                    label="Update"
                                    style={{ height: 40 }}
                                    onPress={() => navigation.navigate("ReportsEdit", { id: state.data?.id })}
                                />
                            </View>
                        </View>
                    </View>
                </Animatable.View>
            </UlContentLoader>
        </View>
    )
}





const PaymentLine = (props) => {
    let { label, value, description } = props

    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingHorizontal: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "50%" }}>
                <View style={[st.paymentLabelWrapper, { backgroundColor: getLabelColor(label) }]}>
                    <UlText style={st.paymentLabel}>{label}</UlText>
                </View>
                <UlText style={{ fontWeight: "600" }}>{description || " "} </UlText>
            </View>
            <View style={st.lineWrapper}>
                <UlText style={{ fontSize: 16, color: "#000000" }}>{value || "-"}</UlText>
            </View>
        </View>
    )
}

