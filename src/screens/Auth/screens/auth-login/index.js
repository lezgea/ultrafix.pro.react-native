import React, { useReducer, useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { signIn } from "../../actions";
import Auth from "../../../../plugins/auth";
import { ScrollView, VStack } from "native-base";
import { UlBlueButton, UlDarkBlueButton, UlFormInput, UlText } from "../../../../components";
import VX from '../../../../plugins/vx';
import { EyeIcon, EyeOffIcon } from '@assets/icons';



export default function AuthLoginScreen(props) {
    let { navigation } = props;
    const [hidePassword, setHidePassword] = useState(true)

    const [state, setState] = useReducer(
        (prevState, newState) => {
            return { ...prevState, ...newState };
        },
        {
            // email: "muslim.ragimov@yahoo.com",
            // password: "Mu$l!m13",
            // email: "tavabil@hotmail.com",
            // password: "Houston2022$",
            // email: "aydin.amiraslanov@outlook.com",
            // password: "Baku2022$",
            email: "",
            password: "",
            loading: false,
        },
    )

    async function onSignIn() {
        await signIn(state, setState)
        if (Auth.getToken()) {
            navigation.replace('NavigationRoutes')
        }
    }


    function onApply() {
        navigation.navigate('AppliersAdd')
    }


    return (
        <ScrollView
            automaticallyAdjustKeyboardInsets={true}
            style={{ padding: 30, backgroundColor: "#fff" }}
            contentContainerStyle={{ height: VX.screenHeight() - 80, justifyContent: "space-between" }}
        >
            <Image
                source={require("../../../../assets/img/ultrafix_main_logo.png")}
                style={{ alignSelf: "center", marginTop: VX.screenHeight() / 10, maxHeight: VX.screenHeight() / 4.4, width: VX.screenHeight() / 4.5 }}
            />
            <VStack space={5} alignItems="center">
                <View style={{ width: "100%", height: 50, position: "relative", flexDirection: "row" }}>
                    <UlFormInput
                        size="2xl"
                        onChangeText={(text) => setState({ ...state, email: text })}
                        value={state.email}
                        returnKeyType={'next'}
                        placeholderTextColor={'rgba(0,0,0, 0.3)'}
                        placeholder={"Email"}
                        autoCapitalize={"none"}
                        autoComplete={true}
                    />
                </View>
                <View style={{ width: "100%", height: 50, position: "relative", flexDirection: "row" }}>
                    <UlFormInput
                        size="2xl"
                        value={state.password}
                        returnKeyType={'next'}
                        placeholderTextColor={'rgba(0,0,0, 0.3)'}
                        placeholder={"Password"}
                        autoCapitalize={"none"}
                        secureTextEntry={hidePassword}
                        onChangeText={(text) => setState({ ...state, password: text })}
                    />
                    <TouchableOpacity style={{ right: 0, position: "absolute", height: 50, width: 50, alignItems: "center", justifyContent: 'center' }}
                        onPress={() => setHidePassword(!hidePassword)}
                    >
                        {hidePassword ? <EyeIcon size={25} color="#b4b4b4" /> : <EyeOffIcon size={25} color={"#b4b4b4"} />}
                    </TouchableOpacity>
                </View>
                <UlDarkBlueButton
                    label={"Log In"}
                    loading={state.loading}
                    style={{ marginTop: 50 }}
                    onPress={onSignIn}
                />
                <UlBlueButton
                    label={"Apply Now"}
                    style={{ marginBottom: VX.screenHeight() / 12 }}
                    onPress={onApply}
                />
                <UlText style={{ fontSize: 16, textAlign: "center", color: '#8c8c8c' }}>Make Appliances Great Again</UlText>
            </VStack>
        </ScrollView>
    );
}

