import React from "react";
import { FlatList, TouchableOpacity, View, SafeAreaView } from "react-native";
import { IconArrowMoveTop } from "../../../../assets";
import { getInvoicesList } from "../../../../api";
import { ListCard } from "../../components";
import { getLabel } from "../../actions";
import {
    UlContentLoader,
    UlEmptyContent,
    UlEmptyFooter,
    UlFilterBar,
    UlFooterLoading,
    UlHeader
} from "../../../../components";
import { InvoicesListStyles as st } from "../../styles";
import DateLib from "../../../../plugins/date-lib";
import VX from "../../../../plugins/vx";



export default function InvoicesListScreen({ navigation }) {
    const [state, setState] = React.useReducer(
        (prevState, newState) => {
            return { ...prevState, ...newState };
        },
        {
            invoicesType: "today",
            params: {
                page: 1,
                daterange: `${DateLib.getDate("today")}-${DateLib.getDate("today")}`,
                type: "invoice",
            },
            data: [],
            loading: false,
            bottomLoading: false,
            refreshing: false,
        },
    )

    const flatListRef = React.useRef()
    const [topPadding, setTopPadding] = React.useState(55)
    const [scrollBtnVisible, setScrollBtnVisible] = React.useState(false)

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


    React.useEffect(() => {
        loadData()
    }, [state.params])


    return (
        <View style={st.screenContainer}>
            <UlHeader
                label={`Invoices`}
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
                        data={state.data}
                        numColumns={1}
                        renderItem={(invoice) =>
                            <ListCard
                                key={invoice.index}
                                index={invoice.index}
                                navigation={navigation}
                                invoice={invoice.item}
                                label={getLabel(invoice.order_status?.value)}
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

                    {
                        scrollBtnVisible &&
                        <TouchableOpacity
                            style={st.scrollBtn}
                            onPress={scrollToTop}
                        >
                            <IconArrowMoveTop width={25} height={25} />
                        </TouchableOpacity>
                    }
                </SafeAreaView>
            </UlContentLoader>
        </View>
    );
}

