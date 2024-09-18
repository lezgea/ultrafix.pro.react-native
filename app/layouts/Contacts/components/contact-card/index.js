import {TouchableOpacity, View} from "react-native";
import {IconUser} from "../../../../assets";
import {UlText} from "../../../../components";
import React from "react";
import {ContactCardStyles as st} from "../../styles";



export const ContactCard = (props) => {
    let {name, phone, onPress} = props

    return (
        <TouchableOpacity
            style={st.card}
            onPress={onPress}
        >
            <View style={st.cardContentWrapper}>
                <View style={st.userIconWrapper}>
                    <IconUser width={40} height={40}/>
                </View>
                <View style={{marginLeft: 5}}>
                    <UlText style={st.name}>{name}</UlText>
                    <UlText style={st.phone}>{phone}</UlText>
                </View>
            </View>
        </TouchableOpacity>
    )
}
