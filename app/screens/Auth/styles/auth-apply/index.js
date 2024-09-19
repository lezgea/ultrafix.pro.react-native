import {StyleSheet} from "react-native";
import variables from "../../../../config/variables";
import VX from "../../../../plugins/vx";

export const AuthApplyStyles = StyleSheet.create({
    screenWrapper: {
        paddingTop: VX.screenHeight()/10,
        backgroundColor: "#fff",
    },
    formWrapper: {
        flex: 1,
        height: "100%",
        padding: 30,
        backgroundColor: "#fff",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        bottom: 0,
        marginBottom: 100,
    },
    logo: {
        alignSelf: "center",
        height: 60,
        width: 220,
        marginBottom: "5%",
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        color: '#8c8c8c',
    },
})
