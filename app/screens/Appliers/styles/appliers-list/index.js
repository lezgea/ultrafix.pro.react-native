import {StyleSheet} from "react-native";


export const AppliersListStyles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        position: "relative",
    },
    contentWrapper: {
        marginTop: 100,
        padding: 20,
    },

    card: {
        flex: 1,
        minWidth: "50%",
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.2,
        backgroundColor: "#fff",
        shadowRadius: 2,
        elevation: 3,
        shadowColor: "#676767",
    },
    cardContentWrapper: {
        paddingHorizontal: 10,
        paddingVertical: 12,
        flexDirection: 'row',
    },
    buttonsWrapper: {
        padding: 10,
        flexDirection: 'row',
    },
    userIconWrapper: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderStyle: "solid",
        borderColor: "rgba(117,164,206,0.9)",
        borderRadius: 100,
        marginRight: 10,
        maxWidth: 70,
        maxHeight: 70,
        minWidth: 70,
        minHeight: 70,
    },
    fullname: {
        fontWeight: "600",
        fontSize: 20,
        marginBottom: 3,
        color: "#000",
    },
    phone: {
        fontSize: 16,
        fontWeight: "500",
        color: "rgba(107,107,107,0.9)",
    }
})
