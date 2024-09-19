import {TouchableOpacity, View} from "react-native";
import {IconUser} from "../../../../assets";
import {UlText} from "../../../../components";
import {StatusLabel} from "../status-label";
import {Divider} from "native-base";
import {UlRedButton, UlBlueButton} from "../../../../components";
import React from "react";



export const ApplierCard = (props) => {
    let {index, id, firstname, status, lastname, phone, created_at, onAccept, onCancel} = props

    return (
        <TouchableOpacity
            style={st.card}
            onPress={() => {}}
        >
            <View style={st.cardContentWrapper}>
                <View style={st.userIconWrapper}>
                    <IconUser width={60} height={60}/>
                </View>
                <View>
                    <UlText style={st.fullname}>{firstname} {lastname}</UlText>
                    <UlText style={st.phone}>{phone}</UlText>
                    <StatusLabel value={status.value} />
                </View>
            </View>
            <Divider />
            <View style={st.buttonsWrapper}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    {
                        (status.value === 'accepted' || status.value === 'pending') &&
                        <UlRedButton
                            label={status.value === 'accepted' ? "Remove" : "Decline"}
                            style={{flex: 1, fontSize: 15, maxHeight: 40, maxWidth: 100, marginRight: 10}}
                            onPress={() => onCancel(id)}
                        />
                    }
                    {
                        (status.value === 'canceled' || status.value === 'pending') &&
                        <UlBlueButton
                            label={status.value === 'pending' ? "Accept" : "Restore"}
                            style={{flex: 1, fontSize: 15, maxHeight: 40, maxWidth: 110}}
                            onPress={() => onAccept(id)}
                        />
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
}
