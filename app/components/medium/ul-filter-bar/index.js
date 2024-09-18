import React from "react";
import { View, StyleSheet } from "react-native";
import { useState } from "react";
import DateLib from "../../../plugins/date-lib";
import { UlSelectButton } from "../../small";
import variables from "../../../config/variables";
import DatePicker from "react-native-date-picker";
import moment from "moment";


export const UlFilterBar = (props) => {
    let { setState, type, setType, onPressShowMore } = props;
    const [showMore, setShowMore] = React.useState(false)
    const [selectedDate, setSelectedDate] = React.useState(DateLib.date('Y:m:d'))

    function onShowMore() {
        setShowMore(!showMore);
        onPressShowMore(showMore ? variables.headerHeight - 35 : variables.headerHeight + 5)
    }

    function onShowToday() {
        setType("today")
        setState({
            loading: true,
            ordersList: [],
            params: { page: 1, daterange: `${DateLib.getDate("today")}-${DateLib.getDate("today")}` },
        })
    }

    function onShowYesterday() {
        setType("yesterday")
        setState({
            loading: true,
            ordersList: [],
            params: { page: 1, daterange: `${DateLib.getDate("yesterday")}-${DateLib.getDate("yesterday")}` },
        })
    }

    function onShowTomorrow() {
        setType("tomorrow")
        setState({
            loading: true,
            ordersList: [],
            params: { page: 1, daterange: `${DateLib.getDate("tomorrow")}-${DateLib.getDate("tomorrow")}` },
        })
    }

    function onShowThisWeek() {
        setType("this_week")
        setState({
            loading: true,
            ordersList: [],
            params: { page: 1, daterange: `${DateLib.getDate("this_week")}` },
        })
    }

    function onShowThisMonth() {
        setType("this_month")
        setState({
            loading: true,
            ordersList: [],
            params: { page: 1, daterange: `${DateLib.getDate("this_month")}` },
        })
    }


    function onShowCustom() {
        setType("custom")

    }


    function onHandleDateChange(date) {
        console.log('@@@', date)
    }


    return (
        <View style={st.filtersWrapper}>
            <View style={{ width: "100%", zIndex: 3 }}>
                <View style={st.filtersRow}>
                    <UlSelectButton
                        label={"Today"}
                        selected={type === "today"}
                        containerStyle={{ flex: 2 }}
                        onPress={onShowToday}
                    />
                    <UlSelectButton
                        label={"Yesterday"}
                        selected={type === "yesterday"}
                        containerStyle={{ flex: 3 }}
                        onPress={onShowYesterday}
                    />
                    <UlSelectButton
                        label={"Tomorrow"}
                        selected={type === "tomorrow"}
                        containerStyle={{ flex: 3 }}
                        onPress={onShowTomorrow}
                    />
                    <UlSelectButton
                        icon={showMore ? "fog-up" : "fog-down"}
                        iconSize={15}
                        iconColor={"#8d8d8d"}
                        containerStyle={{ flex: 1 }}
                        onPress={() => onShowMore()}
                    />
                </View>
                {
                    showMore &&
                    <View style={st.filtersRow}>
                        <UlSelectButton
                            label={"This Week"}
                            selected={type === "this_week"}
                            containerStyle={{ flex: 3 }}
                            onPress={onShowThisWeek}
                        />
                        <UlSelectButton
                            label={"This Month"}
                            selected={type === "this_month"}
                            containerStyle={{ flex: 3 }}
                            onPress={onShowThisMonth}
                        />
                        <UlSelectButton
                            label={"Custom"}
                            selected={type === "custom"}
                            containerStyle={{ flex: 3 }}
                            onPress={onShowCustom}
                        />
                    </View>
                }

                {
                    // type === 'custom' &&
                    // <DatePicker
                    //     style={{ width: 200 }}
                    //     date={moment().format('YYYY-MM-DD')}
                    //     mode="date"
                    //     placeholder="Select date"
                    //     format="YYYY-MM-DD"
                    //     minDate="2022-01-01"
                    //     maxDate="2023-12-31"
                    //     confirmBtnText="Confirm"
                    //     cancelBtnText="Cancel"
                    //     startDate={moment().toDate()}
                    //     customStyles={{
                    //         dateIcon: {
                    //             position: 'absolute',
                    //             left: 0,
                    //             top: 4,
                    //             marginLeft: 0,
                    //         },
                    //         dateInput: {
                    //             marginLeft: 36,
                    //         },
                    //     }}
                    //     onDateChange={onHandleDateChange}
                    // />
                }
            </View>
        </View>
    )
}


const st = StyleSheet.create({
    filtersWrapper: {
        width: "100%",
        top: variables.headerHeight + 10,
        zIndex: 5,
        padding: 5,
        position: "absolute",
        alignItems: "flex-end",
        backgroundColor: "rgba(233,235,236,0.7)",
    },
    filtersRow: {
        flexDirection: "row",
    },

    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
})
