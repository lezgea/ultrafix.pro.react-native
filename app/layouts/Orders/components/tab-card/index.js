import {Linking, TouchableOpacity, View} from "react-native";
import TimeC from "../../../../plugins/time-c";
import React from "react";
import {TabCardStyles as st} from "../../styles";
import {UlText} from "../../../../components";
import * as Animatable from "react-native-animatable";



export const TabCard = (props) => {
    let { navigation, order, index, label } = props
    let addressLine = order.address.length > 20 ? `${order.address.substring(0, 15)}...` : order.address
    let {technicians = []} = order

    return (
        <Animatable.View
            key={index}
            animation="bounceInLeft"
            easing="ease-in-out"
            iterationCount="1"
            duration={700}
            delay={index*30}
            style={st.card}
        >
            <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate("OrdersInfo", {id: order.id, label: label})}
            >
                <View style={[st.labelWrapper, { backgroundColor: label.color }]}>
                    <UlText style={st.type}>{order.type.value}</UlText>
                    <UlText style={st.label}>{label.label}</UlText>
                </View>
                <UlText style={st.ticket}>#{order.ticket}</UlText>
                <View style={st.dateWrapper}>
                    <UlText style={st.date}>{order.date}</UlText>
                    <UlText style={st.time}>{TimeC.anteTime(order.time)}</UlText>
                </View>
                <View style={st.techWrapper}>
                    {
                        technicians?.map((tech, i) =>
                            <View key={i} style={st.techBox}>
                                <UlText style={st.techName}>{tech.name}</UlText>
                            </View>
                        )
                    }
                </View>
                <TouchableOpacity onPress={() => !!order?.location && Linking.openURL(order.location)}>
                    <UlText style={st.address}>{addressLine}</UlText>
                </TouchableOpacity>
            </TouchableOpacity>
        </Animatable.View>
    )
}

