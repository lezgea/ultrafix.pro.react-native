import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import PriceC from "../../../../plugins/price-c";
import DateLib from "../../../../plugins/date-lib";
import { UlText } from "../../../../components";
import UlCustomIcon from "../../../../components/small/ul-custom-icon";
import TimeC from "../../../../plugins/time-c";
import * as Animatable from "react-native-animatable";
import { getLabelColor } from "../../../../actions";


export const ListCard = (props) => {
    let { navigation, invoice, index, label } = props;


    return (
        <Animatable.View
            key={index}
            animation="bounceInLeft"
            easing="ease-in-out"
            iterationCount="1"
            duration={800}
            delay={index * 40}
            style={st.listCard}
        >
            <TouchableOpacity
                onPress={() => navigation.navigate("InvoicesInfo", { id: invoice.id })}
            >
                <View style={st.listTopWrapper}>
                    {/* <View style={[st.listLabelWrapper, { backgroundColor: label.color }]}>
                    <UlText style={st.listType}>{invoice.status?.value.toUpperCase()}</UlText>
                    <UlText style={st.listLabel}>{label.title}</UlText>
                </View> */}

                    <UlText style={st.listTicket}>#{invoice.ticket_num}</UlText>
                    <View style={st.listDateWrapper}>
                        {/* <UlText style={st.listTime}>{moment(invoice.created_at).format("HH:mm")}</UlText> */}
                        <UlText style={st.listDate}>{DateLib.date("d M, Y", invoice.unix_data_start)}</UlText>
                    </View>
                </View>
                <Animatable.View
                    key={index}
                    animation="bounceInLeft"
                    easing="ease-in-out"
                    iterationCount="1"
                    duration={1000}
                    delay={index * 30}
                    style={st.personsInfoWrapper}
                >
                    <View style={st.technicianWrapper}>
                        {
                            !!invoice.users?.length &&
                            <>
                                <UlCustomIcon name={"fog-user-settings"} size={25} color={"#999999"} />
                                <View style={{ marginLeft: 6 }}>
                                    <UlText style={st.personInfoLabel}>Technician</UlText>
                                    <UlText style={st.personInfoName}>{invoice.users[0]?.name}</UlText>
                                </View>
                            </>
                        }
                    </View>
                    <View style={st.customerWrapper}>
                        <View style={{ alignItems: "flex-end", marginRight: 6 }}>
                            <UlText style={st.personInfoLabel}>Customer</UlText>
                            <UlText style={st.personInfoName}>{invoice.customer_name}</UlText>
                        </View>
                        <UlCustomIcon name={"fog-user"} size={25} color={"#999999"} />
                    </View>
                </Animatable.View>
                <View style={st.paymentInfoWrapper}>
                    <View style={st.paymentsWrapper}>
                        {
                            !!invoice?.payment_types.length &&
                            invoice.payment_types.map((payment, index) =>
                                <View key={index} style={[st.paymentLabelWrapper, { backgroundColor: getLabelColor(payment?.value) }]}>
                                    <UlText style={[st.paymentLabel, { color: "#fff" }]}>{payment?.value}</UlText>
                                </View>
                            )
                        }
                    </View>
                    <UlText style={[st.amount, { color: !invoice.total_amount ? "#a8a8a8" : "#6b9808" }]}>$ {PriceC.convert(invoice.total_amount)}</UlText>
                </View>
            </TouchableOpacity>
        </Animatable.View>
    );
};


const st = StyleSheet.create({
    listCard: {
        flex: 1,
        minWidth: "50%",
        margin: 5,
        borderRadius: 10,
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.2,
        backgroundColor: "#fff",
        shadowRadius: 2,
        elevation: 3,
        shadowColor: "#676767",
    },
    listTopWrapper: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: "#e7e6e6",
        paddingBottom: 5,
    },
    listTicket: {
        fontSize: 26,
        fontWeight: "700",
        marginLeft: 15,
        marginTop: 10,
        color: "#000",
    },
    listType: {
        color: "#fff",
        textTransform: "uppercase",
        fontSize: 9,
        fontWeight: "500",
    },
    listLabelWrapper: {
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 10,
        paddingHorizontal: 13,
        paddingVertical: 8,
        minWidth: "37%",
    },
    listLabel: {
        color: "#fff",
        textTransform: "uppercase",
        fontSize: 13,
        fontWeight: "600",
    },
    listDateWrapper: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        marginTop: 10,
        marginRight: 15,
    },
    listDate: {
        fontSize: 10,
    },
    listTime: {
        fontSize: 12,
        lineHeight: 12,
        fontWeight: "600",
        color: "#000",
    },

    paymentsWrapper: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 2,
    },
    paymentLabelWrapper: {
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5,
        marginRight: 5,
    },
    paymentLabel: {
        color: "#fff",
        textTransform: "uppercase",
        fontSize: 12,
        fontWeight: "700",
        borderRadius: 10,
    },
    personsInfoWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: "#e7e6e6",
        paddingHorizontal: 15,
        paddingVertical: 7,
    },
    personInfoLabel: {
        color: "#A1A2A3",
        fontSize: 12,
        fontWeight: "500",
    },
    personInfoName: {
        color: "#4D4F50",
        fontSize: 15,
        lineHeight: 18,
        fontWeight: "700",
    },
    technicianWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    customerWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },

    paymentInfoWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    paymentText: {
        color: "#4D4F50",
        fontSize: 15,
        lineHeight: 18,
        fontWeight: "700",
        marginLeft: 6,
    },
    amount: {
        fontSize: 20,
        fontWeight: "700",
    }

});
