import {Text, TouchableOpacity, StyleSheet, View} from "react-native";
import React from "react";
import UlCustomIcon from "../../ul-custom-icon";
import * as Animatable from "react-native-animatable";
import {UlText} from "../../ul-text";


export const UlDarkBlueButton = (props) => {
    let {label, loading, icon, onPress, labelStyle} = props;

    return(
        <TouchableOpacity
            style={[st.btnContainer, {...props.style}]}
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
                        <UlCustomIcon name="fog-spinner-2" size={25} color={"rgba(255,255,255,0.54)"}/>
                    </Animatable.View>
                    :
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        {
                            icon &&
                            <View style={st.arrowIconWrapper}>
                                <UlCustomIcon name={icon} color={"#fff"} size={16}/>
                            </View>
                        }
                        <UlText style={[st.btnLabel, {...labelStyle}]}>{label}</UlText>
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
        height: 50,
        borderRadius: 5,
        paddingHorizontal: 16,
        paddingVertical: 7,
        backgroundColor: '#003168'
    },
    btnLabel: {
        fontSize: 18,
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


