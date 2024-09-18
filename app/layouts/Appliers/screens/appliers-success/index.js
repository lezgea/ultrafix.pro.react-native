import React from 'react';
import {View, Text, Image} from 'react-native';
import {ScrollView} from "native-base";
import {IconSuccess} from "../../../../assets";
import {AuthSuccessStyles as st} from "../../../Auth/styles";
import {UlBlueButton, UlText} from "../../../../components";


export default function AppliersSuccessScreen(props) {
    let {navigation} = props

    function onGoBack() {
        navigation.navigate("Login")
    }


    return (
        <ScrollView automaticallyAdjustKeyboardInsets={true} style={st.screenWrapper}>
            <Image source={require("../../../../assets/img/logo.png")} style={st.logo}/>
            <View style={st.formWrapper}>
                <View style={st.successIconWrapper}>
                    <IconSuccess width={100} height={100}/>
                </View>
                <UlText style={st.mainText}>Your application has been sent</UlText>
                <UlText style={[st.mainText, {
                    fontSize: 30,
                    fontWeight: '700',
                    marginBottom: 30,
                    marginTop: 5
                }]}>SUCCESSFULLY</UlText>
                <UlText style={st.description}>Thanks for joining us. The confirmation message will be sent to your email
                    address in a few hours.</UlText>

                <UlBlueButton
                    label="Go Back"
                    style={{marginTop: 100, marginBottom: 15}}
                    onPress={onGoBack}
                />
                <UlText style={st.description}>Make Appliances Great Again</UlText>
            </View>
        </ScrollView>
    )
}


