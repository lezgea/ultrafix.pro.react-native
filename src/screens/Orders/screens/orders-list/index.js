import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
    SafeAreaView,
} from "react-native";
import getDirections from "../../../../utils/google-map-directions";
import { getOrdersGeometry, getOrdersList } from "../../../../api";
import { TabCard, ListCard } from "../../components";
import { getLabel } from "@screens/Orders/actions";
import { IconGoogleMap, IconArrowMoveTop, IconNoData, ArrowMoveTopIcon } from "../../../../assets";
import { Box, Card, Center, Flex, useToast } from "native-base";
import { OrdersListStyles as st } from "../../styles";
import DateLib from "../../../../plugins/date-lib";
import {
    UlContentLoader,
    UlEmptyContent,
    UlEmptyFooter,
    UlFilterBar,
    UlFooterLoading,
    UlHeader
} from "../../../../components";
import VX from "../../../../plugins/vx";



export default function OrdersListScreen(props) {
    let { navigation, route } = props
    const [state, setState] = useReducer(
        (prevState, newState) => {
            return { ...prevState, ...newState };
        },
        {
            ordersList: [],
            ordersType: "today",
            loading: false,
            bottomLoading: false,
            params: {
                page: 1,
                daterange: `${DateLib.getDate("today")}-${DateLib.getDate("today")}`,
            },
            order_ids: [],
            geometryData: [],
        },
    )

    const toast = useToast()

    const flatListRef = React.useRef()
    const [tabView, setTabView] = useState(false)
    const [topPadding, setTopPadding] = useState(55)
    const [scrollBtnVisible, setScrollBtnVisible] = useState(false)
    const [filterModalVisible, setFilterModalVisible] = useState(false)
    const [coordinates, setCoordinates] = useState([])
    const [lastDestination, setLastDestination] = useState({})


    function scrollToTop() {
        flatListRef.current?.scrollToOffset({ animated: true, offset: 0 })
        setScrollBtnVisible(false)
    }

    function onShowFilters() {
        setFilterModalVisible(true)
    }

    function onCreateOrder() {
        navigation.navigate("orders-add")
    }

    async function loadOrders() {
        if (state.params.page > 1) {
            setState({ bottomLoading: true })
        } else {
            setState({ loading: true })
        }
        let response = await getOrdersList({ ...state.params })
        if (response.status === "success") {
            if (state.params.page > 1) {
                setState({
                    ordersList: state.ordersList?.concat(response.data),
                    bottomLoading: false,
                })
            } else {
                setState({
                    ordersList: response.data,
                })
            }
        }
        setState({ loading: false, bottomLoading: false })
    }


    const handleGetDirections = async () => {
        let pendingOrders = state.ordersList.filter(item => item.label?.value === "pending")
        let orderIds = pendingOrders.map(item => item.id)
        let response = await getOrdersGeometry({ order_ids: orderIds })
        let wayPoints = response.data?.map(item => item[0]?.geometry)

        await getDirections({
            // destination: wayPoints[wayPoints.length - 1],
            params: [
                {
                    key: "travelmode",
                    value: "driving",        // may be "walking", "bicycling" or "transit" as well
                },
                {
                    key: "dir_action",
                    value: "navigate"       // this instantly initializes navigation using the given travel mode
                }
            ],
            waypoints: wayPoints,
        })
    }


    React.useEffect(() => {
        loadOrders()
    }, [
        state.params,
    ])


    React.useEffect(() => {
        navigation.addListener('focus', () => {
            setState({ ...state, loading: true })
            loadOrders()
        });
    }, [navigation])


    return (
        <View style={st.screenContainer}>
            <UlHeader
                label={`Orders`}
                navigation={navigation}
                showBackBtn
                showSwitchViewBtn
                tabView={tabView}
                onShowFilters={onShowFilters}
                onSwitchView={() => setTabView(!tabView)}
            />
            <UlFilterBar
                setState={setState}
                type={state.ordersType}
                setType={(v) => setState({ ordersType: v })}
                onPressShowMore={(v) => setTopPadding(v)}
            />
            <UlContentLoader loading={state.loading}>
                <SafeAreaView>
                    {
                        tabView
                            ?
                            <FlatList
                                key={"#"}
                                ref={flatListRef}
                                data={state.ordersList}
                                numColumns={2}
                                keyExtractor={(order, index) => `order-${index}-${order.id.toString()}`}
                                renderItem={(order) =>
                                    <TabCard
                                        index={order.index}
                                        navigation={navigation}
                                        order={order.item}
                                        label={getLabel(order.item.label.value)}
                                    />
                                }
                                onEndReached={() => {
                                    setScrollBtnVisible(true)
                                    setState({ params: { ...state.params, page: state.params.page + 1 } })
                                }}
                                ListEmptyComponent={<UlEmptyContent />}
                                ListFooterComponent={() => state.bottomLoading ? <UlFooterLoading /> : <UlEmptyFooter />}
                                contentContainerStyle={{ padding: 5, paddingTop: topPadding, minHeight: VX.screenHeight() }}
                            />
                            :
                            <FlatList
                                key={"_"}
                                ref={flatListRef}
                                data={state.ordersList}
                                numColumns={1}
                                keyExtractor={(order, index) => `order-${index}-${order.id.toString()}`}
                                renderItem={(order) =>
                                    <ListCard
                                        index={order.index}
                                        navigation={navigation}
                                        order={order.item}
                                        label={getLabel(order.item.label.value)}
                                    />
                                }
                                onEndReached={() => {
                                    setScrollBtnVisible(true)
                                    setState({ params: { ...state.params, page: state.params.page + 1 } })
                                }}
                                ListEmptyComponent={<UlEmptyContent />}
                                ListFooterComponent={() => state.bottomLoading ? <UlFooterLoading /> : <UlEmptyFooter />}
                                contentContainerStyle={{ padding: 5, paddingTop: topPadding, minHeight: VX.screenHeight() }}
                            />
                    }
                </SafeAreaView>
            </UlContentLoader>

            <View style={st.rightBtnsWrapper}>
                {
                    scrollBtnVisible &&
                    <TouchableOpacity style={st.scrollBtn} onPress={scrollToTop}>
                        <ArrowMoveTopIcon size={25} />
                    </TouchableOpacity>
                }
                {/*<TouchableOpacity style={st.addBtn} onPress={onCreateOrder}>*/}
                {/*    <UlCustomIcon name="fog-plus-bold" size={24} color={"#fff"}/>*/}
                {/*</TouchableOpacity>*/}
            </View>

            {
                state.ordersType === "today" &&
                <TouchableOpacity
                    style={st.mapBtn}
                    onPress={handleGetDirections}
                >
                    <IconGoogleMap height={35} width={45} />
                </TouchableOpacity>
            }
        </View>
    );
}


