import {FlatList, SafeAreaView, TouchableOpacity, View} from "react-native";
import React, {useEffect, useReducer, useState} from "react";
import {UlContentLoader, UlFooterLoading, UlHeader} from "../../../../components";
import {IconArrowMoveTop} from "../../../../assets";
import {TechListCard} from "../../components";
import {loadInvoices} from "../../../../api";
import {ReportsDispatcherListStyles as st} from "../../styles";


export default function ReportsDispatcherListScreen ({navigation}) {
    const [state, setState] = useReducer(
        (prevState, newState) => {
            return { ...prevState, ...newState };
        },
        {
            params: {
                page: 1,
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


    useEffect(() => {
        loadInvoices(state, setState)
    }, [state.params])


    return(
        <View style={st.screenContainer}>
            <UlHeader
                label={`Dispatcher Reports`}
                navigation={navigation}
                showFilterBtn
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
                        renderItem={(report, index) =>
                            <TechListCard
                                key={index}
                                index={index}
                                navigation={navigation}
                                report={report.item}
                            />
                        }
                        onEndReached={() => {
                            setScrollBtnVisible(true)
                            setState({...state, params: {...state.params, page: state.params.page + 1}})
                        }}
                        ListFooterComponent={<UlFooterLoading visible={state.loading}/>}
                        contentContainerStyle={{padding: 5, paddingTop: 60}}
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

