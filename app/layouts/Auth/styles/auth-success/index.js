import {StyleSheet} from "react-native";

export const AuthSuccessStyles = StyleSheet.create({
    screenWrapper: {
        paddingTop: 100,
        backgroundColor: "#fff",
    },
    formWrapper: {
        alignItems: "center",
        flex: 1,
        height: "100%",
        padding: 30,
        backgroundColor: "#fff",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        bottom: 0,
    },
    logo: {
        alignSelf: "center",
        height: 60,
        width: 220,
        marginBottom: "5%",
    },
    successIconWrapper: {
        marginTop: 30,
        marginBottom: 40,
    },
    mainText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "500",
        color: "rgba(0,0,0,0.9)",
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        color: '#8c8c8c',
    },
})
