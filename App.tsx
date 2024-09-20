import { StyleSheet, View, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeBaseProvider } from "native-base";
import Auth from "./src/plugins/auth";
import HomeProfileScreen from "./src/screens/Home/screens/home-profile";
import CalendarViewScreen from "./src/screens/Calendar/screens/calendar-view";
import ReportsMainScreen from "./src/screens/Reports/screens/reports-main";
import ReportsTechnicianListScreen from "./src/screens/Reports/screens/reports-technician-list";
import ReportsDispatcherListScreen from "./src/screens/Reports/screens/reports-dispatcher-list";
import ReportsInfoScreen from "./src/screens/Reports/screens/reports-info";
import InvoicesListScreen from "./src/screens/Invoices/screens/invoices-list";
import InvoicesInfoScreen from "./src/screens/Invoices/screens/invoices-info";
import ChatsListScreen from "./src/screens/Chats/screens/chats-list";
import OrdersListScreen from "./src/screens/Orders/screens/orders-list";
import OrdersInfoScreen from "./src/screens/Orders/screens/orders-info";
import OrdersAddScreen from "./src/screens/Orders/screens/orders-add";
import OrdersEditScreen from "./src/screens/Orders/screens/orders-edit";
import AuthLoginScreen from "./src/screens/Auth/screens/auth-login";
import AuthSplashScreen from "./src/screens/Auth/screens/auth-splash";
import AppliersListScreen from "./src/screens/Appliers/screens/appliers-list";
import AppliersAddScreen from "./src/screens/Appliers/screens/appliers-add";
import AppliersSuccessScreen from "./src/screens/Appliers/screens/appliers-success";
// import InvoicesViewScreen from "./app/layouts/Invoices/screens/invoices-view";
import ContactsListScreen from "./src/screens/Contacts/screens/contacts-list";
import ContactsInfoScreen from "./src/screens/Contacts/screens/contacts-info";
import variables from "./src/config/variables"
import ReportsEditScreen from "./src/screens/Reports/screens/reports-edit";
import { ToastProvider } from 'react-native-toast-notifications'
import { UlToast } from "./src/components";
import InvoicesEditScreen from "./src/screens/Invoices/screens/invoices-edit";
import OrdersPhotosScreen from "./src/screens/Orders/screens/orders-photos";
import { FileIcon, HomeIcon, ProjectIcon } from "@assets/icons";



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
                        <HomeIcon size={35} color={color} />
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
                    tabBarIcon: ({ color }) => (
                        <ProjectIcon size={35} color={color} />
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
                    tabBarIcon: ({ color }) => (
                        <FileIcon size={35} color={color} />
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
        </Tab.Navigator >
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
