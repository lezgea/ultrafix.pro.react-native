import { StyleSheet } from "react-native";
import variables from "../../../../config/variables";


export const ReportsEditStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardsWrapper: {
        paddingTop: 15,
        paddingBottom: 300,
        paddingHorizontal: 3,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
    },
    card: {
        flex: 1,
        minWidth: "50%",
        margin: 5,
        borderRadius: 10,
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.2,
        backgroundColor: "#fff",
        shadowRadius: 2,
        elevation: 3,
        shadowColor: "#676767",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#E7E7E7",
        paddingHorizontal: 12,
        paddingVertical: 7,
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
});
