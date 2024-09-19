import {StyleSheet} from "react-native";

export const ChatsListStyles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: "#E9EBEC",
    },
    scrollBtn: {
        position: "absolute",
        bottom: 15,
        right: 15,
        zIndex: 3,
        width: 50,
        height: 50,
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
