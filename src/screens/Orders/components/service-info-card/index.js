import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { OrdersInfoStyles as st } from "../../styles";
import { UlInfoLine, UlText } from "../../../../components";
import * as Animatable from "react-native-animatable";
import { DownIcon, UpIcon } from "@assets/icons";


export const ServiceInfoCard = ({ info, label: { label } }) => {
    const [expand, setExpand] = useState(false)

    return (
        <Animatable.View
            animation="bounceInLeft"
            easing="ease-in-out"
            iterationCount="1"
            duration={800}
            style={st.orderInfoCard}
        >
            <TouchableOpacity style={st.expandableBox} onPress={() => setExpand(!expand)}>
                <UlText style={st.infoCardLabel}>Customer Info</UlText>
                <TouchableOpacity style={st.expandBtn} onPress={() => setExpand(!expand)}>
                    {
                        expand ? <UpIcon size={16} color={"#8c8c8c"} /> : <DownIcon size={16} color={"#8c8c8c"} />
                    }
                </TouchableOpacity>
            </TouchableOpacity>
            {
                expand &&
                <View style={{ padding: 10 }}>
                    <UlInfoLine
                        index={0}
                        label={"Ticket"}
                        value={info.ticket_num}
                        hideBorder
                        gray
                    />
                    <UlInfoLine
                        index={1}
                        label={"Address"}
                        value={info.address}
                    />
                    <UlInfoLine
                        index={2}
                        label={"City"}
                        value={info.city}
                        gray
                    />
                    <UlInfoLine
                        index={3}
                        label={"State"}
                        value={info.state}
                    />
                    <UlInfoLine
                        index={4}
                        label={"Zip Code"}
                        value={info.zip}
                        gray
                    />
                    <UlInfoLine
                        index={5}
                        label={"Name"}
                        value={info.customer_name}
                    />
                    {/* <UlInfoLine
                        index={6}
                        label={"Phone"}
                        value={info.customer_phone}
                        gray
                    /> */}
                </View>
            }
        </Animatable.View>
    );
}
