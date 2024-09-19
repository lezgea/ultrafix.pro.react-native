import React from 'react'
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { UlText } from '../../small';
import * as Animatable from "react-native-animatable";


export const UlCard = (props) => {
    let { children, label, touchable, animated, containerStyle, contentStyle, animation, duration, delay } = props

    if (touchable) {
        return (
            <TouchableOpacity {...props} style={[st.listCard, containerStyle]}>
                {children}
            </TouchableOpacity>
        )
    }

    if (animated) {
        <Animatable.View
            animation={animation}
            easing="ease-in-out"
            iterationCount="1"
            duration={duration}
            delay={delay}
            style={[st.listCard, containerStyle]}
        >
            {
                label &&
                <View style={st.labelWrapper}>
                    <UlText style={st.label}>{label}</UlText>
                </View>
            }
            <View style={[contentStyle]}>
                {children}
            </View>
        </Animatable.View>
    }

    return (
        <View {...props} style={[st.listCard, containerStyle]}>
            {
                label &&
                <View style={st.labelWrapper}>
                    <UlText style={st.label}>{label}</UlText>
                </View>
            }
            <View style={[contentStyle]}>
                {children}
            </View>
        </View>
    )
}



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
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#E7E7E7",
    },
    labelWrapper: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: "#E7EAEC",
        // backgroundColor: "#F8F8F8",
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        color: "#000",
    }

});
