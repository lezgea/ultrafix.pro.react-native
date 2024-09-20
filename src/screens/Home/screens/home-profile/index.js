import React, { useEffect, useRef } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { IconArrowMoveTop, IconUser, IconProfileCover, IconCircleGradient, ProfileCoverIcon, CircleGradientIcon, UserIcon, ArrowMoveTopIcon } from "../../../../assets";
import { getInvoicesSummary, getLoggedUserInfo, getOrdersSummary, loadDashboardData } from "../../../../api";
import { Spacer } from "native-base";
import * as Animatable from "react-native-animatable";
import VX from "../../../../plugins/vx";
import { QUOTES } from "../../../../config/constants";
import { ListCard, TabCard } from "../../components";
import Auth from "../../../../plugins/auth";
import { UlCard, UlContentLoader, UlHeader, UlText } from "../../../../components";
import { HomeProfileStyles as st } from "../../styles";
import DateLib from "../../../../plugins/date-lib";
import PriceC from "../../../../plugins/price-c";
import variables from "../../../../config/variables";
import Perms from "../../../../plugins/perms";
import Cache from "../../../../plugins/cache";

// const role = Auth.getRole()

export const cards = [
    {
        label: "Orders",
        color: "#8556d7",
        to: "OrdersList",
        // permission: Perms.get(Cache.getItem("role"),"canSeeOrders"),
    },
    {
        label: "Reports",
        color: "#2583F0",
        to: "ReportsTechnician",
        // permission: Perms.get(Cache.getItem("role"),"canSeeReportsTechnician"),
    },
    // { label: "Dispatcher Reports", color: "rgb(10,150,161)", to: "ReportsDispatcher" },
    {
        label: "Invoices",
        color: "#82b21c",
        to: "InvoicesList",
        // permission: Perms.get(Cache.getItem("role"),"canSeeInvoices"),
    },
    // {
    //     label: "Contacts",
    //     color: "rgb(86,113,140)",
    //     to: "ContactsList",
    //     // permission: Perms.get(Cache.getItem("role"),"canSeeContacts"),
    // },
    // {
    //     label: "New Appliers",
    //     color: "rgba(17,129,116,0.9)",
    //     to: "AppliersList",
    //     // permission: Perms.get(Cache.getItem("role"),"canSeeNewAppliers"),
    // },
];


export default function HomeProfileScreen({ navigation }) {

    const [state, setState] = React.useReducer((prevState, newState) => ({ ...prevState, ...newState }), {
        loading: false,
        signOutLoading: false,
        tabview: false,
        scrollBtnVisible: false,
        orderParams: {
            daterange: `2015:01:01-${DateLib.getDate("today")}`,
        },
        reportParams: {
            daterange: `${DateLib.getDate("yesterday")}-${DateLib.getDate("today")}`,
        },
        reportsSummary: {},
        ordersSummary: {},
        userInfo: {},
        quoteInfo: {
            quote: "",
            author: "",
        },
    })


    const scrollRef = useRef();
    let listViewOffset = 0;

    const scrollToTop = () => {
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });
    };

    function onScrollDown(event) {
        const currentOffset = event.nativeEvent.contentOffset.y;
        const direction = (currentOffset > 20 && currentOffset > listViewOffset)
            ? "up"
            : "down";
        setState({ scrollBtnVisible: direction === "up" })
    }


    function getRandomQuote() {
        let quoteItem = QUOTES[Math.floor(Math.random() * QUOTES.length)]
        setState({ quoteInfo: quoteItem })
    }


    async function loadOrdersSummary() {
        setState({ loading: true })
        let response = await getOrdersSummary(state.orderParams)
        if (response.status === "success") {
            setState({
                ordersSummary: {
                    completed: !!response.orders?.completed?.length ? response.orders?.completed[0]?.count : 0,
                    cancelled: !!response.orders?.completed?.length ? response.orders?.completed[1]?.count : 0,
                    parts_ordered: !!response.orders?.uncompleted?.length ? response.orders?.uncompleted[0]?.count : 0,
                    parts_received: !!response.orders?.uncompleted?.length ? response.orders?.uncompleted[1]?.count : 0,
                    pending: !!response.orders?.uncompleted?.length ? response.orders?.uncompleted[2]?.count : 0,
                }
            })
        }
        getRandomQuote()
        setState({ loading: false })
    }


    async function loadReportsSummary() {
        let response = await getInvoicesSummary(state.reportParams)
        if (response.status === "success") {
            setState({ reportsSummary: response.data })
        }
    }


    async function loadUserInfo() {
        let response = await getLoggedUserInfo()
        if (response.data) {
            setState({ userInfo: response.data })
        }
    }


    function getRole(role_id) {
        switch (role_id) {
            case 1:
                return {
                    title: "Admin",
                    color: "#1da6d0",
                }
            default:
                return {
                    title: "Technician",
                    color: "#ea8b2b",
                }
        }
    }


    async function signOut() {
        setState({ ...state, signOutLoading: true })
        await Auth.flush()
        setTimeout(() => {
            navigation.replace('AuthRoutes')
            setState({ ...state, signOutLoading: true })
        }, 1200)
    }


    async function loadData() {
        await loadUserInfo()
        await loadOrdersSummary()
        await loadReportsSummary()
    }

    React.useEffect(() => {
        loadData()
    }, [])


    React.useEffect(() => {
        navigation.addListener('focus', () => {
            setState({ ...state, loading: true })
            loadData()
        });
    }, [navigation])


    return (
        <View style={st.screenContainer}>
            <UlHeader
                showLogo
                showSignOut
                signOutIconSize={20}
                signOutLoading={state.signOutLoading}
                navigation={navigation}
                tabView={state.tabView}
                onSwitchView={() => setState({ tabView: !state.tabView })}
                onClickSignOut={signOut}
            />
            <UlContentLoader loading={state.loading}>
                <ScrollView
                    onScroll={onScrollDown}
                    contentContainerStyle={st.cardsWrapper}
                >
                    <Animatable.View
                        animation="fadeIn"
                        easing="ease-out"
                        iterationCount="1"
                        style={{ position: "absolute", top: -13, left: 0 }}
                    >
                        <ProfileCoverIcon width={VX.screenWidth()} height={430} />
                    </Animatable.View>
                    <Animatable.View
                        animation="fadeIn"
                        easing="ease-in-out"
                        iterationCount="1"
                        duration={2000}
                        delay={500}
                        style={{ width: "100%", padding: 5, position: "absolute", top: variables.headerHeight - 70, textAlign: "right", alignItems: "flex-end", justifyContent: "flex-end" }}
                    >
                        <UlText style={st.quote}>{state.quoteInfo?.quote}</UlText>
                        <UlText style={st.quoteAuthor}>{state.quoteInfo?.author}</UlText>
                    </Animatable.View>
                    <View style={st.userInfoContainer}>
                        <Animatable.View
                            animation="pulse"
                            easing="ease-in-out"
                            iterationCount="infinite"
                            duration={4000}
                            style={st.userIconWrapper}
                        >
                            <UserIcon size={110} />
                        </Animatable.View>
                        <Animatable.View
                            animation="bounceInRight"
                            easing="ease-out"
                            iterationCount="1"
                            style={st.userDescriptionWrapper}
                        >
                            <UlText style={st.userName}>{state.userInfo?.name}</UlText>
                            <UlText style={st.userDescription}>{state.userInfo?.email}</UlText>
                            <UlText style={[st.userDescription, { marginTop: 20, fontWeight: "600", color: "#505050" }]}>{getRole(state.userInfo?.role_id).title}</UlText>
                        </Animatable.View>
                    </View>
                    <UlCard
                        containerStyle={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: "#dadada",
                            borderStyle: "solid",
                            overflow: "hidden",
                            minWidth: VX.w(300),
                            justifyContent: "space-between",
                            padding: 20,
                        }}
                    >
                        <Animatable.View
                            animation="rotate"
                            easing="ease-in-out"
                            iterationCount="infinite"
                            duration={20000}
                            style={{ position: "absolute", left: -50, top: -80, marginLeft: 5, height: 200, width: 250 }}
                        >
                            <CircleGradientIcon size={270} />
                        </Animatable.View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                            </View>
                            <View style={{ flex: 1 }}>
                                <ChartDescriptionLine
                                    align="right"
                                    description="PENDING"
                                    value={state.ordersSummary?.pending}
                                    color={'#99ACC3'}
                                    size={32}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 20 }}>
                            <View style={{ flex: 1 }}>
                                <ChartDescriptionLine
                                    align="left"
                                    description="CANCELLED ORDERS"
                                    value={state.ordersSummary?.cancelled}
                                    color={'#FC636B'}
                                    size={32}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <ChartDescriptionLine
                                    align="right"
                                    description="COMPLETED ORDERS"
                                    value={state.ordersSummary?.completed}
                                    color={'#719f0e'}
                                    size={32}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 20 }}>
                            <View style={{ flex: 1 }}>
                                <ChartDescriptionLine
                                    align="left"
                                    description="PARTS ORDERED"
                                    value={state.ordersSummary?.parts_ordered}
                                    color={'#219ce0'}
                                    size={32}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <ChartDescriptionLine
                                    align="right"
                                    description="PARTS RECEIVED"
                                    value={state.ordersSummary?.parts_received}
                                    color={'#0551A8'}
                                    size={32}
                                />
                            </View>
                        </View>
                    </UlCard>
                    {/** ---------  SUMMARY REPORTS SECTION  **/}
                    {
                        // Perms.get(Cache.getItem("role"),"canSeeReportsSummary") &&
                        // <UlCard containerStyle={{borderWidth: 1, borderColor: "#d3d3d3", borderStyle: "solid", overflow: "hidden", justifyContent: "space-between", padding: 20}}>
                        //     <View style={{flexDirection: "row"}}>
                        //         <View style={{flex: 1}}>
                        //             <ChartDescriptionLine
                        //                 align="left"
                        //                 description="GROSS SALES"
                        //                 value={`$ ${PriceC.convert(state.reportsSummary?.total_amount)}`}
                        //             />
                        //         </View>
                        //         <View style={{flex: 1}}>
                        //             <ChartDescriptionLine
                        //                 align="right"
                        //                 description="NET SALES"
                        //                 value={`$ ${PriceC.convert(state.reportsSummary?.total_minus_expense)}`}
                        //                 color={'#719f0e'}
                        //             />
                        //         </View>
                        //     </View>
                        //     <View style={{flexDirection: "row", marginTop: 25}}>
                        //         <View style={{flex: 1}}>
                        //             <ChartDescriptionLine
                        //                 align="left"
                        //                 description="EMPLOYEE EARNINGS"
                        //                 value={`$ ${PriceC.convert(state.reportsSummary?.employee_earnings)}`}
                        //             />
                        //         </View>
                        //         <View style={{flex: 1}}>
                        //             <ChartDescriptionLine
                        //                 align="right"
                        //                 description="TOTAL PARTS"
                        //                 value={`$ ${PriceC.convert(state.reportsSummary?.total_parts)}`}
                        //             />
                        //         </View>
                        //     </View>
                        //     <View style={{flexDirection: "row", marginTop: 25}}>
                        //         <View style={{flex: 1}}>
                        //             <ChartDescriptionLine
                        //                 align="left"
                        //                 description="TOTAL DUE"
                        //                 value={`$ ${PriceC.convert(state.reportsSummary?.employee_total_due)}`}
                        //             />
                        //         </View>
                        //         <View style={{flex: 1}}>
                        //             <ChartDescriptionLine
                        //                 align="right"
                        //                 description="GRAND TOTAL"
                        //                 value={`$ ${PriceC.convert(state.reportsSummary?.grand_total)}`}
                        //                 color={'#EB9633'}
                        //             />
                        //         </View>
                        //     </View>
                        // </UlCard>
                    }
                    {
                        state.tabView
                            ?
                            cards.map((card, index) =>
                                // card.permission &&
                                <TabCard key={index} index={index} navigation={navigation} card={card} />)
                            :
                            cards.map((card, index) =>
                                // card.permission &&
                                <ListCard key={index} index={index} navigation={navigation} card={card} />)
                    }
                </ScrollView>
                {
                    state.scrollBtnVisible &&
                    <TouchableOpacity
                        style={st.scrollBtn}
                        onPress={scrollToTop}
                    >
                        <ArrowMoveTopIcon size={25} color="#fff" />
                    </TouchableOpacity>
                }
            </UlContentLoader>
        </View>
    );
}


const ChartDescriptionLine = (props) => {
    let { description, align, value, size = 20, color = "#525252" } = props;

    return (
        <View style={{ alignItems: align === "right" ? "flex-end" : "flex-start" }}>
            <Animatable.View
                animation={description === "PENDING" ? "pulse" : "bounceIn"}
                easing="ease-in-out-cubic"
                iterationCount={description === "PENDING" ? "infinite" : "1"}
                duration={description === "PENDING" ? 2000 : 1000}
                delay={500}
            >
                <UlText style={[st.countStyle, { color: color, fontSize: size }]}>{value}</UlText>
            </Animatable.View>
            <Animatable.View
                animation="bounceInLeft"
                easing="ease-out"
                iterationCount="1"
            >
                <UlText style={[st.countDescription,]}>{description}</UlText>
            </Animatable.View>
        </View>
    )
}

