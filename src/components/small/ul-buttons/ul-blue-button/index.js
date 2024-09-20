import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import { UlText } from "../../ul-text";
import { SpinnerIcon } from "@assets/icons";


export const UlBlueButton = (props) => {
    let { label, icon, loading, onPress, labelStyle, signOutIconSize } = props;

    return (
        <TouchableOpacity
            style={[st.btnContainer, { ...props.style }]}
            onPress={onPress}
        >
            {
                loading
                    ?
                    <Animatable.View
                        animation="rotate"
                        iterationCount="infinite"
                        duration={800}
                    >
                        <SpinnerIcon size={signOutIconSize || 25} color={"rgba(255,255,255,0.54)"} />
                    </Animatable.View>
                    :
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        {
                            // icon &&
                            // <View style={st.arrowIconWrapper}>
                            //     <UlCustomIcon name={icon} color={"#fff"} size={16}/>
                            // </View>
                        }
                        <UlText style={[st.btnLabel, { ...labelStyle }]}>{label}</UlText>
                    </View>
            }
        </TouchableOpacity>
    )
}


const st = StyleSheet.create({
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 55,
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 7,
        backgroundColor: '#2267b7'
    },
    btnLabel: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '500',
    },
    arrowIconWrapper: {
        width: 35,
        height: 35,
        borderRadius: 30,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.2)",
    },
})


