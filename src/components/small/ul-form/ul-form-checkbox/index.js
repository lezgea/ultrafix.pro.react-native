import React from "react";
import {StyleSheet, View} from "react-native";
import {Checkbox, CheckIcon, FormControl, HStack, Select, WarningOutlineIcon} from "native-base";
import {UlText} from "../../ul-text";


export const UlFormCheckbox = (props) => {
    let {label, required, value, onChange} = props

    return(
        <View style={st.wrapper}>
            <FormControl isRequired={required}>
                <HStack w="100%" justifyContent="flex-start" alignItems="center" key={label}>
                    <Checkbox isChecked={value} onChange={onChange} value={value}></Checkbox>
                    <UlText style={{marginLeft: 10, fontSize: 16}} onPress={onChange}>{label}</UlText>
                </HStack>
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
        marginTop: 10,
    },
});

