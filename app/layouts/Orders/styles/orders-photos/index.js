import { StyleSheet } from "react-native";
import variables from "../../../../config/variables";

export const OrdersPhotosStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardsWrapper: {
        paddingTop: 13,
        paddingBottom: 300,
        paddingHorizontal: 3,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
    },
    infoCard: {
        flex: 1,
        minWidth: "60%",
        marginBottom: 5,
        borderRadius: 7,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        backgroundColor: "#fff",
        shadowRadius: 5,
        elevation: 20,
        shadowColor: "#000000",
    },
    infoCardHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F9F9F9",
        borderBottomWidth: 1,
        borderBottomColor: "#efefef",
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        paddingHorizontal: 13,
        paddingVertical: 10,
    },
    infoCardContent: {
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    lineWrapper: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 7,
        paddingHorizontal: 10
    },
    label: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: "500",
    },
    paymentsWrapper: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 2,
    },
    paymentLabelWrapper: {
        flexDirection: "row",
        paddingHorizontal: 5,
        paddingVertical: 2,
        maxHeight: 20,
        borderRadius: 5,
        marginRight: 5,
    },
    paymentLabel: {
        color: "#fff",
        textTransform: "uppercase",
        fontSize: 12,
        fontWeight: "700",
        borderRadius: 10,
    },

    bottomButtonsWrapper: {
        width: "100%",
        bottom: variables.tabBarHeight,
        zIndex: 5,
        paddingVertical: 5,
        position: "absolute",
        alignItems: "flex-end",
        backgroundColor: "rgba(233,235,236,0.7)",
    },
    buttonsRow: {
        flex: 1,
        paddingHorizontal: 5,
        flexDirection: "row",
    },
})
