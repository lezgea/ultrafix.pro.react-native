import { StyleSheet, View, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeBaseProvider } from "native-base";
import Auth from "./app/plugins/auth";
import HomeProfileScreen from "./app/layouts/Home/screens/home-profile";
import CalendarViewScreen from "./app/layouts/Calendar/screens/calendar-view";
import ReportsMainScreen from "./app/layouts/Reports/screens/reports-main";
import ReportsTechnicianListScreen from "./app/layouts/Reports/screens/reports-technician-list";
import ReportsDispatcherListScreen from "./app/layouts/Reports/screens/reports-dispatcher-list";
import ReportsInfoScreen from "./app/layouts/Reports/screens/reports-info";
import InvoicesListScreen from "./app/layouts/Invoices/screens/invoices-list";
import InvoicesInfoScreen from "./app/layouts/Invoices/screens/invoices-info";
import ChatsListScreen from "./app/layouts/Chats/screens/chats-list";
import OrdersListScreen from "./app/layouts/Orders/screens/orders-list";
import OrdersInfoScreen from "./app/layouts/Orders/screens/orders-info";
import OrdersAddScreen from "./app/layouts/Orders/screens/orders-add";
import OrdersEditScreen from "./app/layouts/Orders/screens/orders-edit";
import AuthLoginScreen from "./app/layouts/Auth/screens/auth-login";
import AuthSplashScreen from "./app/layouts/Auth/screens/auth-splash";
import UlCustomIcon from "./app/components/small/ul-custom-icon";
import AppliersListScreen from "./app/layouts/Appliers/screens/appliers-list";
import AppliersAddScreen from "./app/layouts/Appliers/screens/appliers-add";
import AppliersSuccessScreen from "./app/layouts/Appliers/screens/appliers-success";
// import InvoicesViewScreen from "./app/layouts/Invoices/screens/invoices-view";
import ContactsListScreen from "./app/layouts/Contacts/screens/contacts-list";
import ContactsInfoScreen from "./app/layouts/Contacts/screens/contacts-info";
import variables from "./app/config/variables"
import ReportsEditScreen from "./app/layouts/Reports/screens/reports-edit";
import { ToastProvider } from 'react-native-toast-notifications'
import { UlToast } from "./app/components";
import InvoicesEditScreen from "./app/layouts/Invoices/screens/invoices-edit";
import OrdersPhotosScreen from "./app/layouts/Orders/screens/orders-photos";



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const authRoutes = [
    { name: "AuthLogin", component: AuthLoginScreen },
    { name: "AppliersAdd", component: AppliersAddScreen },
    { name: "AppliersSuccess", component: AppliersSuccessScreen },
]

const mainRoutes = [
    { name: "HomeProfile", component: HomeProfileScreen },
    { name: "CalendarView", component: CalendarViewScreen },
    { name: "ReportsMain", component: ReportsMainScreen },
    { name: "ReportsTechnician", component: ReportsTechnicianListScreen },
    { name: "ReportsDispatcher", component: ReportsDispatcherListScreen },
    { name: "ReportsInfo", component: ReportsInfoScreen },
    { name: "ReportsEdit", component: ReportsEditScreen },
    { name: "AppliersList", component: AppliersListScreen },
    { name: "ContactsList", component: ContactsListScreen },
    { name: "ContactsInfo", component: ContactsInfoScreen },
    { name: "InvoicesList", component: InvoicesListScreen },
    { name: "InvoicesInfo", component: InvoicesInfoScreen },
    // { name: "InvoicesView", component: InvoicesViewScreen },
    { name: "InvoicesEdit", component: InvoicesEditScreen },
    { name: "OrdersList", component: OrdersListScreen },
    { name: "OrdersInfo", component: OrdersInfoScreen },
    { name: "OrdersAdd", component: OrdersAddScreen },
    { name: "OrdersEdit", component: OrdersEditScreen },
    { name: "OrdersPhotos", component: OrdersPhotosScreen },
    { name: "ChatsList", component: ChatsListScreen },
]



const AuthRoutes = () => {
    return (
        <Stack.Navigator initialRouteName="AuthLogin">
            {
                authRoutes.map((item, i) =>
                    <Stack.Screen
                        key={i}
                        name={item.name}
                        component={item.component}
                        options={{ headerShown: false }}
                    />
                )
            }
        </Stack.Navigator>
    );
};


export default function App() {
    Auth.get();

    return (
        <ToastProvider
            placement="top"
            animationType="zoom-in"
            duration={2000}
            renderToast={(options) => <UlToast {...options} />}
        >
            <NativeBaseProvider>
                <View style={st.container}>
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="AuthSplash">
                            <Stack.Screen
                                name="AuthSplash"
                                component={AuthSplashScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="AuthRoutes"
                                component={AuthRoutes}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="NavigationRoutes"
                                component={NavigationRoutes}
                                options={{ headerShown: false }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </View>
            </NativeBaseProvider>
        </ToastProvider>

    );
}


const NavigationRoutes = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeProfile"
            screenOptions={{
                headerShown: false,
                tabBarStyle: { height: variables.tabBarHeight, paddingTop: 15 }
            }}
        >
            <Tab.Screen
                name="HomeProfile"
                options={{
                    tabBarLabel: "home-profile",
                    tabBarLabelStyle: { display: "none" },
                    tabBarIcon: ({ color }) => (
                        <UlCustomIcon name="fog-home" color={color} size={35} />
                    )
                }}
            >
                {() => (
                    <Stack.Navigator initialRouteName="HomeProfile" screenOptions={{ headerShown: false }}>
                        {
                            mainRoutes.map((route, index) =>
                                <Stack.Screen key={index} name={route.name} component={route.component} />
                            )
                        }
                    </Stack.Navigator>
                )}
            </Tab.Screen>
            {/*<Tab.Screen*/}
            {/*    name="ChatsList"*/}
            {/*    options={{*/}
            {/*        tabBarLabel: "Chats",*/}
            {/*        tabBarLabelStyle: {display: "none"},*/}
            {/*        tabBarIcon: ({color, size}) => (*/}
            {/*            <UlCustomIcon name="fog-message" color={color} size={35}/>*/}
            {/*        ),*/}
            {/*    }}*/}
            {/*>*/}
            {/*    {() => (*/}
            {/*        <Stack.Navigator initialRouteName="chats-list" screenOptions={{headerShown: false}}>*/}
            {/*            {*/}
            {/*                chatRoutes.map((route, index) =>*/}
            {/*                    <Stack.Screen key={index} name={route.name} component={route.component}/>,*/}
            {/*                )*/}
            {/*            }*/}
            {/*        </Stack.Navigator>*/}
            {/*    )}*/}
            {/*</Tab.Screen>*/}
            <Tab.Screen
                name="OrdersList"
                options={{
                    tabBarLabel: "Orders",
                    tabBarLabelStyle: { display: "none" },
                    tabBarIcon: ({ color, size }) => (
                        <UlCustomIcon name="fog-project" color={color || "red"} size={33} />
                    )
                }}
            >
                {() => (
                    <Stack.Navigator initialRouteName="OrdersList" screenOptions={{ headerShown: false }}>
                        {
                            mainRoutes.map((route, index) =>
                                <Stack.Screen key={index} name={route.name} component={route.component} />
                            )
                        }
                    </Stack.Navigator>
                )}
            </Tab.Screen>
            <Tab.Screen
                name="InvoicesList"
                options={{
                    tabBarLabel: "Invoices",
                    tabBarLabelStyle: { display: "none" },
                    tabBarIcon: ({ color, size }) => (
                        <UlCustomIcon name="fog-file" color={color || "red"} size={33} />
                    )
                }}
            >
                {() => (
                    <Stack.Navigator initialRouteName="InvoicesList" screenOptions={{ headerShown: false }}>
                        {
                            mainRoutes.map((route, index) =>
                                <Stack.Screen key={index} name={route.name} component={route.component} />
                            )
                        }
                    </Stack.Navigator>
                )}
            </Tab.Screen>
        </Tab.Navigator>
    );
};


const st = StyleSheet.create({
    container: {
        flex: 1
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: "Gill Sans",
        textAlign: "center",
        margin: 10,
        color: "#ffffff",
        backgroundColor: "transparent"
    }
});
