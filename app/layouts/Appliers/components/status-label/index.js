import React from 'react'
import {StyleSheet, View} from "react-native";
import {UlText} from "../../../../components";


export const StatusLabel = ({value}) => {
    switch(value) {
        case 'pending':
            return(
                <View style={st.pendingLabelWrapper}>
                    <UlText style={st.pending}>{value.toUpperCase()}</UlText>
                </View>
            )
        case 'accepted':
            return(
                <View style={st.acceptedLabelWrapper}>
                    <UlText style={st.accepted}>{value.toUpperCase()}</UlText>
                </View>
            )
        case 'canceled':
            return(
                <View style={st.cancelledLabelWrapper}>
                    <UlText style={st.cancelled}>CANCELLED</UlText>
                </View>
            )

        default:
            return(
                <View style={st.pendingLabelWrapper}>
                    <UlText style={st.pending}>{value.toUpperCase()}</UlText>
                </View>
            )
    }
}


const st = StyleSheet.create({
    pendingLabelWrapper: {
        maxWidth: 80,
        marginTop: 3,
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderRadius: 3,
        backgroundColor: "rgba(68,68,68,0.15)",
    },
    pending: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
        color: "#5d5d5d",
    },

    acceptedLabelWrapper: {
        maxWidth: 80,
        marginTop: 3,
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderRadius: 3,
        backgroundColor: "rgba(3,187,88,0.15)",
    },
    accepted: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
        color: "rgba(0,124,59,0.9)",
    },

    cancelledLabelWrapper: {
        maxWidth: 80,
        marginTop: 3,
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderRadius: 3,
        backgroundColor: "rgba(234,139,43,0.2)",
    },
    cancelled: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
        color: "#c96e13",
    },
})
