import { StyleSheet } from "react-native";
import variables from "../../../../config/variables";

export const OrdersInfoStyles = StyleSheet.create({
    container: {
        flex: 1,
    },

    cardsWrapper: {
        paddingTop: variables.headerHeight + 35,
        paddingBottom: 300,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
    },

    orderInfoCard: {
        flex: 1,
        minWidth: "60%",
        marginBottom: 5,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        backgroundColor: "#fff",
        shadowRadius: 5,
        elevation: 20,
        shadowColor: "#000000",
    },
    infoCardLabel: {
        fontSize: 20,
        fontWeight: "600",
        color: "#000000",
    },
    expandableBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        borderBottomColor: "#EEEEEE",
    },

    expandBtn: {
        alignItems: "center",
        justifyContent: "center",
        width: 35,
        height: 35,
        marginLeft: 5,
        borderRadius: 30,
        backgroundColor: "rgba(0,0,0,0.06)",
    },

    mapBtn: {
        display: "flex",
        flexDirection: "row",
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#dedede",
        // borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: "#ffffff",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 20,
        shadowColor: "#A3A3A3",
    },

    addBtn: {
        zIndex: 3,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0695e7",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 20,
        shadowColor: "#006ca8",
    },

});
