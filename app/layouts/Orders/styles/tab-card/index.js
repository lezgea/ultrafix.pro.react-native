import {StyleSheet} from "react-native";

export const TabCardStyles = StyleSheet.create({
    card: {
        flex: 1,
        minWidth: "40%",
        maxWidth: "47%",
        margin: "1.5%",
        borderRadius: 10,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.2,
        backgroundColor: "#fff",
        shadowRadius: 2,
        elevation: 20,
        shadowColor: "#000000",
    },
    techWrapper: {
        flexDirection: 'row',
        paddingLeft: 10,
        marginTop: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#e7e6e6",
        paddingBottom: 8,
    },
    techBox: {
        paddingVertical: 2,
        paddingHorizontal: 8,
        marginRight: 5,
        borderRadius: 5,
        backgroundColor: "rgb(13,152,140)",
    },
    techName: {
        fontSize: 12,
        fontWeight: "500",
        color: "#fff",
    },
    ticket: {
        fontSize: 26,
        fontWeight: "600",
        marginLeft: 10,
        marginTop: 5,
        color: "#000",
    },
    type: {
        color: "#fff",
        textTransform: "uppercase",
        fontSize: 9,
        fontWeight: "500",
    },
    labelWrapper: {
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 10,
        paddingHorizontal: 13,
        paddingVertical: 8,
        maxWidth: "80%",
    },
    label: {
        color: "#fff",
        textTransform: "uppercase",
        fontSize: 13,
        fontWeight: "600",
    },
    dateWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    date: {
        fontSize: 10,
        marginTop: 2,
    },
    time: {
        fontSize: 12,
        fontWeight: "600",
        color: "#000",
    },
    address: {
        fontSize: 12,
        fontWeight: "500",
        color: "#7B7D7E",
        marginHorizontal: 15,
        marginVertical: 10,
    },
});
