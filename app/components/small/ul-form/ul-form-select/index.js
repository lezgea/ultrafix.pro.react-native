import React from "react";
import {StyleSheet, View} from "react-native";
import {CheckIcon, FormControl, Select, WarningOutlineIcon} from "native-base";


export const UlFormSelect = (props) => {
    let {label, required, options = []} = props

    return(
        <View style={st.wrapper}>
            <FormControl isRequired={required}>
                {label && <FormControl.Label>{label}</FormControl.Label>}
                <Select size="xl" {...props}>
                    {
                        options?.map((option, i) =>
                            <Select.Item key={i} label={option.label} value={option.value}/>
                        )
                    }
                </Select>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    Something went wrong
                </FormControl.ErrorMessage>
            </FormControl>
        </View>
    )
}


const st = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: "100%",
        marginBottom: 5,
    },
    labelWrapper: {
        flexDirection: "row",
        marginBottom: 2,
        marginLeft: 10,
    },
    label: {
        color: "#615E5E",
    },
    input: {
        width: "100%",
        height: 50,
        borderRadius: 7,
        borderWidth: 1,
        paddingHorizontal: 15,
        fontSize: 18,
        paddingVertical: 8,
        color: "#393939",
        borderColor: "#dcdcdc",
        borderStyle: "solid",
        backgroundColor: "#ffffff",
    },
    reqMark: {
        fontSize: 18,
        lineHeight: 18,
        color: "red",
        marginLeft: -5,
        marginRight: 5,
    },
    reqDescription: {
        marginTop: 2,
        color: "red"
    },
});
