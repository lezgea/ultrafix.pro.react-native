import {StyleSheet} from "react-native";

export const OrdersAddStyles = StyleSheet.create({
    container: {
        flex: 1,
    },

    contentWrapper: {
        flex: 1,
        paddingTop: 110,
        paddingBottom: 300,
        paddingHorizontal: 10,
    },

    space: {
        height: 20,
    },
    close: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    closeLabel: {
        color: "red",
        fontSize: 12,
    },
    wrapper: {
        flex: 1,
        width: "100%",
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'lightgray',
        marginBottom: 5,
    },
    labelWrapper: {
        flexDirection: "row",
        marginBottom: 2,
        marginLeft: 10,
    },
    label: {
        color: "#615E5E",
    },
    input: {
        width: "100%",
        height: 50,
        borderRadius: 7,
        borderWidth: 1,
        paddingHorizontal: 15,
        fontSize: 18,
        paddingVertical: 8,
        color: "#393939",
        borderColor: "#dcdcdc",
        borderStyle: "solid",
        backgroundColor: "#ffffff",
    },
    reqMark: {
        fontSize: 18,
        lineHeight: 18,
        color: "red",
        marginLeft: -5,
        marginRight: 5,
    },
    reqDescription: {
        marginTop: 2,
        color: "red",
    },
});
