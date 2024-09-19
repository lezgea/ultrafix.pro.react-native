import React from "react";
import {StyleSheet, View, SafeAreaView, FlatList} from "react-native";
import {UlHeader} from "../../../../components";
import {applyList, applyUpdate} from "../../../../api/auth";
import {UlFooterLoading} from "../../../../components";
import {UlContentLoader} from "../../../../components";
import {useToast} from "native-base";
import {ApplierCard} from "../../components";
import {AppliersListStyles as st} from "../../styles/appliers-list";


export default function AppliersListScreen({ navigation }) {
    const toast = useToast()
    const [state, setState] = React.useReducer(
        (prevState, newState) => {
            return { ...prevState, ...newState };
        },
        {
            loading: false,
            data: [],
            params: {
                skip: 0,
            }
        },
    )

    const [params, setParams] = React.useReducer(
        (prevState, newState) => {
            return { ...prevState, ...newState };
        },
        {
            key: "",
        },
    )


    React.useEffect(() => {
        loadData()
    }, [state.params])


    async function loadData() {
        setState({loading: true})
        let response = await applyList(state.params)
        // if(response.status === "success") {
        //     setState({data: response.data, loading: false})
        // } else {
        //     setState({data: [], loading: false})
        // }
    }

    async function onAccept(id) {
        let response = await applyUpdate({
            id: id,
            status: 2,
        })
        if(response.status === "success") {
            toast.show({placement: "top", description: "Account has been approved successfully!"})
            loadData()
        } else {
            toast.show({placement: "top", description: "Something went wrong"})
        }
    }

    async function onCancel(id) {
        setState({loading: true})
        let response = await applyUpdate({
            id: id,
            status: 3,
        })
        if(response.status === "success") {
            toast.show({placement: "top", description: "Account has been removed successfully!"})
            loadData()
        } else {
            toast.show({placement: "top", description: "Something went wrong"})
        }
    }


    return (
        <View style={st.screenContainer}>
            <UlHeader
                label="New Appliers"
                navigation={navigation}
                showBackBtn
            />
            <UlContentLoader loading={state.loading}>
                <SafeAreaView>
                    <FlatList
                        key={"_"}
                        refreshing={state.loading}
                        data={state.data}
                        numColumns={1}
                        renderItem={(item, i) =>
                            <ApplierCard
                                key={i}
                                onAccept={onAccept}
                                onCancel={onCancel}
                                {...item.item}
                            />
                        }
                        onEndReached={() => {
                            setState({...state, params: {...state.params, skip: state.params.skip + 1}})
                        }}
                        ListFooterComponent={<UlFooterLoading visible={state.loading}/>}
                        contentContainerStyle={{paddingTop: 60}}
                    />
                </SafeAreaView>
            </UlContentLoader>
        </View>
    )
}

