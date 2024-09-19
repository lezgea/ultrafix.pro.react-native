import React, {useReducer} from 'react';
import {View, Text, Image} from 'react-native';
import {ScrollView, useToast, VStack} from "native-base";
import {applyCreate} from "../../../../api/auth";
import {AuthApplyStyles as st} from "../../../Auth/styles";
import {UlBlueButton, UlFormInput, UlGrayButton, UlLoading, UlText} from "../../../../components";


export default function AppliersAddScreen(props) {
    let {navigation} = props
    const toast = useToast()
    const [state, setState] = useReducer(
        (prevState, newState) => {
            return {...prevState, ...newState};
        },
        {
            loading: false,
        },
    )

    const [params, setParams] = useReducer(
        (prevState, newState) => {
            return {...prevState, ...newState};
        },
        {
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            address: '',
        },
    )

    async function onCreateAccount() {
        setState({loading: true})
        let response = await applyCreate(params)

        if (response.status === "success") {
            toast.show({placement: "top", description: response.message || "Account has been created successfully!"})
            setState({loading: false})
            navigation.navigate('SuccessScreen')
        } else {
            toast.show({placement: "top", description: response.message || "Something went wrong"})
            setState({loading: false})
        }
    }

    function onGoBack() {
        navigation.goBack()
    }


    return (
        <ScrollView automaticallyAdjustKeyboardInsets={true} style={st.screenWrapper}>
            {state.loading && <UlLoading/>}
            <Image source={require("../../../../assets/img/logo.png")} style={st.logo}/>
            <View style={st.formWrapper}>
                <VStack space={0} alignItems="center">
                    <UlFormInput
                        size="2xl"
                        label="Firstname"
                        value={params.firstname}
                        returnKeyType={'next'}
                        autoCapitalize={"none"}
                        autoComplete
                        onChangeText={(firstname) => setParams({firstname})}
                    />
                    <UlFormInput
                        size="2xl"
                        label="Lastname"
                        value={params.lastname}
                        returnKeyType={'next'}
                        autoCapitalize={"none"}
                        autoComplete
                        onChangeText={(lastname) => setParams({lastname})}
                    />
                    <UlFormInput
                        size="2xl"
                        label="Phone"
                        value={params.phone}
                        returnKeyType={'next'}
                        autoCapitalize={"none"}
                        autoComplete
                        onChangeText={(phone) => setParams({phone})}
                    />
                    <UlFormInput
                        size="2xl"
                        label="Email"
                        value={params.email}
                        returnKeyType={'next'}
                        autoCapitalize={"none"}
                        autoComplete
                        onChangeText={(email) => setParams({email})}
                    />
                    <UlFormInput
                        size="2xl"
                        label="Address"
                        value={params.address}
                        returnKeyType={'next'}
                        autoCapitalize={"none"}
                        autoComplete
                        onChangeText={(address) => setParams({address})}
                    />
                </VStack>

                <UlBlueButton
                    label="Create Account"
                    loading={state.loading}
                    style={{marginTop: 50, marginBottom: 15}}
                    onPress={onCreateAccount}
                />
                <UlGrayButton
                    label="Go Back"
                    loading={state.loading}
                    style={{marginBottom: 50}}
                    onPress={onGoBack}
                />
                <UlText style={st.description}>Make Appliances Great Again</UlText>
            </View>
        </ScrollView>
    )
}


