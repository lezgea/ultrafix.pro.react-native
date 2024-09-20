import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import { UlText } from "../../ul-text";
import { SpinnerIcon } from "@assets/icons";


export const UlBorderedButton = (props) => {
    let { label, icon, loading, onPress } = props;

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
                        <SpinnerIcon size={25} color={"rgba(255,255,255,0.54)"} />
                    </Animatable.View>
                    :
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        {
                            // icon &&
                            // <View style={st.arrowIconWrapper}>
                            //     <UlCustomIcon name={icon} color={"#2267b7"} size={16}/>
                            // </View>
                        }
                        <UlText style={st.btnLabel}>{label}</UlText>
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
        borderWidth: 1,
        borderColor: '#2267b7'
    },
    btnLabel: {
        fontSize: 18,
        color: '#2267b7',
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


