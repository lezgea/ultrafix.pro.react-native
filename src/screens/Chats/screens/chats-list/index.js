import React, {useEffect, useReducer, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {loadDialogues} from "../../../../api";
import {MessageCard} from "../../components";
import {UlContentLoader, UlFooterLoading, UlHeader} from "../../../../components";
import {IconArrowMoveTop} from "../../../../assets";
import {ChatsListStyles as st} from "../../styles";


export default function ChatsListScreen ({navigation}) {
    const [state, setState] = useReducer(
        (prevState, newState) => {
            return { ...prevState, ...newState };
        },
        {
            params: {
                skip: 0,
                limit: 10,
            },
            data: [],
            loading: false,
            refreshing: false,
        },
    )

    const flatListRef = React.useRef()
    const [scrollBtnVisible, setScrollBtnVisible] = useState(false)

    function scrollToTop() {
        flatListRef.current?.scrollToOffset({ animated: true, offset: 0 })
        setScrollBtnVisible(false)
    }


    // React.useEffect(() => {
    //     loadDialogues(state, setState)
    // }, [state.params])


    React.useEffect(() => {
        navigation.addListener('focus', () => {
            setState({...state, loading: true})
            loadDialogues(state, setState)
        });
    }, [navigation])


    return(
        <View style={st.container}>
            <UlHeader label={`Chat`}
                    navigation={navigation}
                    showBackBtn
            />
            <UlContentLoader loading={state.loading}>
                <SafeAreaView>
                    <FlatList
                        key={"_"}
                        ref={flatListRef}
                        refreshing={state.refreshing}
                        data={state.data}
                        numColumns={1}
                        renderItem={(message, index) =>
                            <MessageCard
                                key={index}
                                index={index}
                                navigation={navigation}
                                {...message.item}
                            />
                        }
                        onEndReached={() => {
                            setScrollBtnVisible(true)
                            setState({...state, params: {...state.params, skip: state.params.skip + 1}})
                        }}
                        ListFooterComponent={<UlFooterLoading visible={state.loading}/>}
                        contentContainerStyle={{paddingTop: 60}}
                    />
                </SafeAreaView>
                {
                    scrollBtnVisible &&
                    <TouchableOpacity
                        style={st.scrollBtn}
                        onPress={scrollToTop}
                    >
                        <IconArrowMoveTop width={25} height={25} />
                    </TouchableOpacity>
                }
            </UlContentLoader>
        </View>
    )
}

