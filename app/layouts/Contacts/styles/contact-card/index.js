import {StyleSheet} from "react-native";


export const ContactCardStyles = StyleSheet.create({
    card: {
        flex: 1,
        minWidth: "50%",
        marginVertical: 3,
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
        paddingHorizontal: 15,
        paddingVertical: 12,
        flexDirection: 'row',
    },
    userIconWrapper: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "rgba(17,129,116,0.9)",
        borderRadius: 100,
        marginRight: 10,
        maxWidth: 45,
        maxHeight: 45,
        minWidth: 45,
        minHeight: 45,
    },
    name: {
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
