import { FlatList, SafeAreaView, TouchableOpacity, View } from "react-native";
import React, { useEffect, useReducer, useState } from "react";
import { ArrowMoveTopIcon } from "@assets/icons";
import { TechListCard } from "../../components";
import { ReportsTechnicianListStyles as st } from "../../styles";
import {
    UlContentLoader,
    UlEmptyContent,
    UlEmptyFooter,
    UlFilterBar,
    UlFooterLoading,
    UlHeader
} from "../../../../components";
import { getInvoicesList } from "../../../../api";
import DateLib from "../../../../plugins/date-lib";
import VX from "../../../../plugins/vx";


export default function ReportsTechnicianListScreen({ navigation }) {
    const [state, setState] = useReducer(
        (prevState, newState) => {
            return { ...prevState, ...newState };
        },
        {
            invoicesType: "today",
            params: {
                page: 1,
                daterange: `${DateLib.getDate("today")}-${DateLib.getDate("today")}`,
                // type: "report",
            },
            data: [],
            loading: false,
            bottomLoading: false,
            refreshing: false,
        },
    )

    const flatListRef = React.useRef()
    const [topPadding, setTopPadding] = useState(55)
    const [scrollBtnVisible, setScrollBtnVisible] = useState(false)

    function scrollToTop() {
        flatListRef.current?.scrollToOffset({ animated: true, offset: 0 })
        setScrollBtnVisible(false)
    }


    async function loadData() {
        if (state.params.page > 1) {
            setState({ bottomLoading: true })
        } else {
            setState({ loading: true })
        }
        let response = await getInvoicesList({ ...state.params })

        if (response.status === "success") {
            if (state.params.page > 1) {
                setState({
                    data: state.data?.concat(response.data),
                    bottomLoading: false,
                })
            } else {
                setState({
                    data: response.data,
                })
            }
        }
        setState({ loading: false, bottomLoading: false })
    }


    useEffect(() => {
        loadData()
    }, [state.params])



    return (
        <View style={st.screenContainer}>
            <UlHeader
                label={`Technician Reports`}
                navigation={navigation}
                showBackBtn
            />
            <UlFilterBar
                setState={setState}
                type={state.invoicesType}
                setType={(v) => setState({ invoicesType: v })}
                onPressShowMore={(v) => setTopPadding(v)}
            />
            <UlContentLoader loading={state.loading}>
                <SafeAreaView>
                    <FlatList
                        key={"_"}
                        ref={flatListRef}
                        refreshing={state.refreshing}
                        data={state.data}
                        numColumns={1}
                        renderItem={(report) =>
                            <TechListCard
                                key={report.index}
                                index={report.index}
                                navigation={navigation}
                                report={report?.item}
                            />
                        }
                        onEndReached={() => {
                            setScrollBtnVisible(true)
                            setState({ ...state, params: { ...state.params, page: state.params.page + 1 } })
                        }}
                        ListEmptyComponent={<UlEmptyContent />}
                        ListFooterComponent={() => state.bottomLoading ? <UlFooterLoading /> : <UlEmptyFooter />}
                        contentContainerStyle={{ padding: 5, paddingTop: topPadding, minHeight: VX.screenHeight() }}
                    />
                </SafeAreaView>
                {
                    scrollBtnVisible &&
                    <TouchableOpacity
                        style={st.scrollBtn}
                        onPress={scrollToTop}
                    >
                        <ArrowMoveTopIcon size={25} color="#fff" />
                    </TouchableOpacity>
                }
            </UlContentLoader>
        </View>
    )
}



