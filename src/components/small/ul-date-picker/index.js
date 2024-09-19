import React, {useState} from 'react'
import DatePicker from "react-native-date-picker";
import {TouchableOpacity, View} from "react-native";


export const UlDatePicker = (props) => {
    let {value, onDateChange, open, onClose} = props
    return(
        <View>
            <DatePicker
                modal
                open={open}
                date={value}
                onDateChange={onDateChange}
                onConfirm={(date) => {
                    onClose()
                    onDateChange(date)
                }}
                onCancel={() => {
                    onClose()
                }}
                {...props}
            />
        </View>
    )
}
