import React from "react";
import {View, SafeAreaView, FlatList} from "react-native";
import {UlHeader} from "../../../../components";
import {UlFooterLoading} from "../../../../components";
import {UlContentLoader} from "../../../../components";
import {useToast} from "native-base";
import {ContactCard} from "../../components";
import {ContactsListStyles as st} from "../../styles";
import {getContactsList} from "../../../../api";


export default function ContactsListScreen({ navigation }) {
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


    async function loadData() {
        setState({loading: true})
        let response = await getContactsList(state.params)
        if(response.status === "success") {
            setState({data: response.data, loading: false})
        } else {
            setState({data: [], loading: false})
        }
    }


    React.useEffect(() => {
        loadData()
    }, [])


    return (
        <View style={st.screenContainer}>
            <UlHeader
                label="Contacts List"
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
                            <ContactCard
                                key={i}
                                onPress={() => navigation.navigate("ContactsInfo", {id: item.item?.id})}
                                {...item.item}
                            />
                        }
                        onEndReached={() => {
                            setState({...state, params: {...state.params, skip: state.params.skip + 1}})
                        }}
                        ListFooterComponent={<UlFooterLoading visible={state.loading}/>}
                        contentContainerStyle={{paddingTop: 7}}
                    />
                </SafeAreaView>
            </UlContentLoader>
        </View>
    )
}

