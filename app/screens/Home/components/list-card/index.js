import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import UlCustomIcon from "../../../../components/small/ul-custom-icon";
import {HomeProfileStyles as st} from "../../styles";
import {UlText} from "../../../../components";
import * as Animatable from "react-native-animatable";
import {IconCircleGradient, IconProfileCover} from "../../../../assets";
import VX from "../../../../plugins/vx";


export const ListCard = (props) => {
    let { navigation, card, index } = props;

    return (
        <Animatable.View
            animation="bounceInLeft"
            easing="ease-in-out"
            iterationCount="1"
            delay={index*100}
            style={[st.listCard, { backgroundColor: card.color }]}
        >
            <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate(card.to)}
                style={[st.listCard, { backgroundColor: card.color }]}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        paddingHorizontal: 15
                    }}
                >
                    <UlText style={st.listLabel}>{card.label}</UlText>
                    <Animatable.View
                        animation="pulse"
                        easing="ease-in-out"
                        iterationCount="infinite"
                        duration={1000}
                        delay={index*400}
                        style={st.arrowIconWrapper}
                    >
                        <TouchableOpacity
                            style={st.arrowIconWrapper}
                            onPress={() => navigation.navigate(card.to)}
                        >
                            <UlCustomIcon name={"fog-right"} color="#fff" size={16}/>
                        </TouchableOpacity>
                    </Animatable.View>
                </View>
            </TouchableOpacity>
        </Animatable.View>
    )
}
