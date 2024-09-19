import React from "react";
import { StyleSheet, View } from "react-native";
import { FormControl, Input, TextArea, WarningOutlineIcon } from "native-base";


export const UlFormInput = (props) => {
    let { label, required, h, textarea } = props

    return (
        <View style={st.wrapper}>
            <FormControl isRequired={required}>
                {label && <FormControl.Label>{label}</FormControl.Label>}
                {
                    textarea
                        ? <TextArea size="xl" h={h || 20} {...props} />
                        : <Input size="xl" {...props} />
                }
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    Something went wrong
                </FormControl.ErrorMessage>
            </FormControl>
        </View>
    )
}


const st = StyleSheet.create({
    wrapper: {
        width: "100%",
        marginBottom: 10,
        minHeight: 40,
        // position: 'relative',
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
