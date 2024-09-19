import {View} from "react-native";
import React, {useEffect, useState} from "react";
import {Calendar} from "react-native-calendars/src/index";
import {UlContentLoader, UlHeader} from "../../../../components";
import {CalendarViewStyles as st} from "../../styles";


export default function CalendarViewScreen ({navigation}) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000)
    }, [])


    return(
        <View style={st.container}>
            <UlHeader label="Calendar" showBackBtn navigation={navigation} />
            <UlContentLoader loading={loading}>
                <View style={{marginHorizontal: 10, borderRadius: 7, overflow: "hidden", borderWidth: 1, borderColor: "#dedede"}}>
                    <Calendar
                        // Collection of dates that have to be marked. Default = {}
                        markedDates={{
                            '2023-03-16': {selected: true, marked: true, selectedColor: 'green'},
                            '2023-03-17': {marked: true},
                            '2023-03-18': {marked: true, dotColor: 'red', activeOpacity: 0},
                            '2023-03-19': {disabled: true, disableTouchEvent: true}
                        }}
                    />
                </View>
            </UlContentLoader>
        </View>
    )
}

