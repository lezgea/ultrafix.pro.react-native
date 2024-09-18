import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import UlCustomIcon from '../../ul-custom-icon'


export const UlRedCircleButton = (props) => {
    let { size = 50, icon } = props

    return (
        <TouchableOpacity style={[st.buttonWrapper, { width: size, height: size }]} {...props}>
            <UlCustomIcon name={icon} size={size / 2} color={"#fff"} />
        </TouchableOpacity>
    )
}


const st = StyleSheet.create({
    buttonWrapper: {
        zIndex: 3,
        width: 50,
        height: 50,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#FC636B',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 20,
        shadowColor: '#FC636B',
    },
})