import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IconBlueCheck, IconGrayCheck, UserIcon, UserSettingsIcon } from "../../../../assets";
import PriceC from "../../../../plugins/price-c";
import { UlText } from "../../../../components";
import DateLib from "../../../../plugins/date-lib";
import * as Animatable from "react-native-animatable";



export const TechListCard = (props) => {
    let { navigation, report, index } = props;

    let date = report.created_at?.split(" ")[0]
    let time = report.created_at?.split(" ")[1].substring(0, 5)


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
                onPress={() => navigation.navigate("ReportsInfo", { id: report.id, })}
            >
                <View style={st.listTopWrapper}>
                    {/*<View style={st.listLabelWrapper}>*/}
                    {/*    <UlText style={st.listType}>{report?.status?.value.toUpperCase()}</UlText>*/}
                    {/*    <View style={st.paymentsWrapper}>*/}
                    {/*        {*/}
                    {/*            !!report?.payment_types.length*/}
                    {/*                ?*/}
                    {/*                report.payment_types.map((payment, index) =>*/}
                    {/*                    <View key={index} style={[st.paymentLabelWrapper, {backgroundColor: getLabelColor(payment?.value)}]}>*/}
                    {/*                        <UlText style={st.paymentLabel}>{payment?.value}</UlText>*/}
                    {/*                    </View>*/}
                    {/*                )*/}
                    {/*                :*/}
                    {/*                <View key={index} style={[st.paymentLabelWrapper, {backgroundColor: getLabelColor()}]}>*/}
                    {/*                    <UlText style={st.paymentLabel}>NOT SELECTED</UlText>*/}
                    {/*                </View>*/}
                    {/*        }*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                    <UlText style={st.listTicket}>#{report.ticket_num}</UlText>
                    <View style={st.listDateWrapper}>
                        <UlText style={st.listDate}>{DateLib.date("d M, Y", report.unix_data_start)}</UlText>
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
                        <UserSettingsIcon size={25} color={"#999999"} />
                        <View style={{ marginLeft: 6 }}>
                            <UlText style={st.personInfoLabel}>Technician</UlText>
                            <UlText style={st.personInfoName}>{report?.users[0]?.name}</UlText>
                        </View>
                    </View>
                    <View style={st.customerWrapper}>
                        <View style={{ alignItems: "flex-end", marginRight: 6 }}>
                            <UlText style={st.personInfoLabel}>Customer</UlText>
                            <UlText style={st.personInfoName}>{report.customer_name}</UlText>
                        </View>
                        <UserIcon size={25} color={"#999999"} />
                    </View>
                </Animatable.View>
                <View style={st.paymentInfoWrapper}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        {
                            report?.status?.value === "paid"
                                ? <IconBlueCheck height={25} width={25} />
                                : report.employee_earnings ? <IconGrayCheck height={25} width={25} /> : null
                        }
                        <View style={{ marginLeft: 6 }}>
                            <UlText style={[st.amount, { color: !report.employee_earnings ? "#fff" : "#000" }]}>$ {PriceC.convert(report.employee_earnings)}</UlText>
                        </View>
                    </View>
                    <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
                        <UlText style={[st.amount, { color: !report?.total_amount ? "#a8a8a8" : "#6b9808" }]}>$ {PriceC.convert(report?.total_amount)}</UlText>
                    </View>
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
        backgroundColor: "#F9F9F9",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingBottom: 5,
    },
    listTicket: {
        fontSize: 26,
        fontWeight: "600",
        marginLeft: 15,
        marginTop: 10,
        color: "#000",
    },
    listType: {
        color: "#778494",
        textTransform: "uppercase",
        fontSize: 9,
        fontWeight: "500",
    },
    listLabelWrapper: {
        borderBottomRightRadius: 20,
        borderRightWidth: 1,
        borderRightStyle: "solid",
        borderRightColor: "#e3e3e3",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: "#efefef",
        borderTopLeftRadius: 10,
        paddingHorizontal: 13,
        paddingVertical: 8,
        minWidth: "40%",
        backgroundColor: "#fff",
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
    listDateWrapper: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        marginTop: 10,
        marginRight: 15,
    },
    listDate: {
        textAlign: "right",
        fontSize: 14,
        color: "#67717a",
    },
    listTime: {
        fontSize: 12,
        lineHeight: 12,
        fontWeight: "600",
        color: "#000",
    },

    personsInfoWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
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
        borderTopWidth: 1,
        borderTopStyle: "solid",
        borderTopColor: "#e7e6e6",
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
        color: "#4D4F50",
    }

});
