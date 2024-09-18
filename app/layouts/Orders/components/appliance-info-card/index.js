import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { OrdersInfoStyles as st } from "../../styles";
import { UlInfoLine, UlText } from "../../../../components";
import UlCustomIcon from "../../../../components/small/ul-custom-icon";
import * as Animatable from "react-native-animatable";


export const ApplianceInfoCard = (props) => {
    let { info, label, problem } = props
    const [expand, setExpand] = useState(true)

    return (
        <Animatable.View
            animation="bounceInLeft"
            easing="ease-in-out"
            iterationCount="1"
            duration={800}
            delay={30}
            style={st.orderInfoCard}
        >
            <TouchableOpacity style={st.expandableBox} onPress={() => setExpand(!expand)}>
                <UlText style={st.infoCardLabel}>{label}</UlText>
                <TouchableOpacity style={st.expandBtn} onPress={() => setExpand(!expand)}>
                    <UlCustomIcon name={`fog-${!expand ? 'down' : 'up'}`} size={16} color={"#8c8c8c"} />
                </TouchableOpacity>
            </TouchableOpacity>
            {
                expand &&
                <View style={{ padding: 10 }}>
                    <UlInfoLine
                        index={0}
                        label={"Model"}
                        value={info.model}
                        hideBorder
                        gray
                    />
                    <UlInfoLine
                        index={1}
                        label={"Brand"}
                        value={info.brand}
                    />
                    <UlInfoLine
                        index={2}
                        label={"Problem"}
                        value={problem}
                        gray
                    />
                </View>
            }
        </Animatable.View>
    );
}

