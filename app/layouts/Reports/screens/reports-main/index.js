import {SafeAreaView, ScrollView, View} from "react-native";
import React, {useEffect, useReducer, useState} from "react";
import {SalesCard} from "../../components";
import {SummaryCard} from "../../components";
import {getInvoicesSummary} from "../../../../api";
import DateLib from "../../../../plugins/date-lib";
import {ReportsMainStyles as st} from "../../styles";
import {UlContentLoader, UlHeader} from "../../../../components";


export default function ReportsMainScreen ({navigation}) {
    const [state, setState] = useReducer(
        (prevState, newState) => {
            return { ...prevState, ...newState };
        },
        {
            params: {
                daterange: `2015:01:01-${DateLib.getDate("today")}`,
            },
            summary: {},
            loading: true,
            refreshing: false,
        },
    )

    useEffect(() => {
        getInvoicesSummary(state, setState)
    }, [])


    return(
        <View style={st.screenContainer}>
            <UlHeader
                label={`Reports`}
                navigation={navigation}
                showBackBtn
            />
            <UlContentLoader loading={state.loading}>
                <SafeAreaView>
                    <ScrollView contentContainerStyle={{padding: 5, paddingTop: 60}}>
                        <SalesCard
                            data={[
                                {label: "Gross Sales", price: state.summary?.total_amount, color: "#000"},
                                {label: "Net Sales", price: state.summary?.total_minus_expense, color: "#7EB800"},
                            ]}
                        />
                        <SummaryCard
                            data={[
                                {label: "Employee Earnings", price: state.summary?.employee_earnings, color: "#000"},
                                {label: "Total Parts", price: state.summary?.total_parts, color: "#000"},
                                {label: "Total Due", price: state.summary?.employee_total_due, color: "#000"},
                                {label: "Grand Total", price: state.summary?.grand_total, color: "#EB9633"},
                            ]}
                        />
                        <SummaryCard
                            buttonLabel="Technician Reports"
                            onButtonClick={() => navigation.navigate("reports-technician-list")}
                        />
                        <SummaryCard
                            buttonLabel="Dispatcher Reports"
                            onButtonClick={() => navigation.navigate("reports-dispatcher-list")}
                        />
                    </ScrollView>
                </SafeAreaView>
            </UlContentLoader>
        </View>
    )
}

