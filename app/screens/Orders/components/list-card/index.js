import React from "react";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TimeC from "../../../../plugins/time-c";
import { ListCardStyles as st } from "../../styles";
import * as Animatable from "react-native-animatable";



export const ListCard = (props) => {
    let { navigation, order, index, label } = props
    let addressLine = order.address.length > 35 ? `${order.address.substring(0, 35)}...` : order.address
    let { technicians = [] } = order


    return (
        <Animatable.View
            key={index}
            animation="bounceInLeft"
            easing="ease-in-out"
            iterationCount="1"
            duration={800}
            delay={index * 30}
            style={st.card}
        >
            <TouchableOpacity
                onPress={() => navigation.navigate("OrdersInfo", { id: order.id, label: label })}
            >
                <View style={st.topWrapper}>
                    <View style={[st.labelWrapper, { backgroundColor: label.color }]}>
                        <Text style={st.type}>{order.type.value}</Text>
                        <Text style={st.label}>{label.label}</Text>
                    </View>
                    <Animatable.View
                        key={index}
                        animation="fadeIn"
                        easing="ease-in-out"
                        iterationCount="1"
                        duration={1000}
                        delay={index * 30}
                    >
                        <Text style={st.ticket}>#{order.ticket}</Text>
                    </Animatable.View>

                    <Animatable.View
                        key={index}
                        animation="bounceInLeft"
                        easing="ease-in-out"
                        iterationCount="1"
                        duration={1000}
                        delay={index * 30}
                        style={st.dateWrapper}
                    >
                        <Text style={st.time}>{TimeC.anteTime(order.time)}</Text>
                        <Text style={st.date}>{order.date}</Text>
                    </Animatable.View>
                </View>
                <TouchableOpacity style={st.bottomWrapper} onPress={() => !!order?.location && Linking.openURL(order.location)}>
                    <Animatable.View
                        key={index}
                        animation="bounceInRight"
                        easing="ease-in-out"
                        iterationCount="1"
                        duration={1000}
                        delay={index * 30}
                    >
                        <Text style={st.address}>{addressLine}</Text>
                    </Animatable.View>

                    <View style={st.techWrapper}>
                        {
                            technicians?.map((tech, i) =>
                                <View key={i} style={st.techBox}>
                                    <Text style={st.techName}>{tech.name}</Text>
                                </View>
                            )
                        }
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Animatable.View>
    );
};
