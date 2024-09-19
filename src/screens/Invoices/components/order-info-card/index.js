import React from 'react'
import { Linking, Text, TouchableOpacity, View } from "react-native";
import { OrderInfoCardStyles as st } from "../../styles/order-info-card";
import TimeC from "../../../../plugins/time-c";
import { STATUSES } from '../../../../constants';
import * as Animatable from "react-native-animatable";


export const OrderInfoCard = (props) => {
    let { navigation, order, index } = props
    let addressLine = order.address?.length > 35 ? `${order.address?.substring(0, 35)}...` : order.address
    let label = React.useMemo(() =>
        STATUSES.filter(item => item.value == order.status)[0],
        [order.status]
    )

    return (
        <Animatable.View
            key={index}
            animation="bounceInLeft"
            easing="ease-in-out"
            iterationCount="1"
            duration={1000}
            delay={30}
            style={[st.card, { marginHorizontal: 0, marginTop: 10 }]}
        >
            <TouchableOpacity
                onPress={() => navigation.navigate("OrdersInfo", { id: order.id, label: label })}
            >
                <View style={st.topWrapper}>
                    <View style={[st.labelWrapper, { backgroundColor: label?.color }]}>
                        <Text style={st.label}>{label?.label}</Text>
                    </View>
                    <Text style={st.ticket}>#{order.ticket_num}</Text>
                    <View style={st.dateWrapper}>
                        <Text style={st.time}>{TimeC.anteTime(order.order_time_range)}</Text>
                        <Text style={st.date}>{order.order_at?.split(" ")[0]}</Text>
                    </View>
                </View>
                <TouchableOpacity style={st.bottomWrapper} onPress={() => !!order?.location && Linking.openURL(order.location)}>
                    <Text style={st.address}>{addressLine}</Text>
                    <View style={st.techWrapper}>
                        {
                            order.technichians?.map((tech, i) =>
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
