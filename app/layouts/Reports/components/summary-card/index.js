import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {CardSection} from "../card-section";
import UlCustomIcon from "../../../../components/small/ul-custom-icon";
import {UlText} from "../../../../components";


export const SummaryCard = (props) => {
    let { data = [], label, navigation, index, buttonLabel, onButtonClick = () => {} } = props;

    return (
        <View>
            <View
                key={index}
                style={st.listCard}
            >
                {
                    data?.map((item, index) =>
                        <CardSection
                            key={index}
                            index={index}
                            label={item.label}
                            price={item.price}
                            color={item.color}
                        />
                    )
                }
                {
                    buttonLabel &&
                    <TouchableOpacity
                        style={{
                            borderBottomRightRadius: 10,
                            borderBottomLeftRadius: 10,
                            paddingHorizontal: 15,
                            paddingVertical: 10,
                            backgroundColor: '#2583F0',
                            marginTop: 5,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                        onPress={onButtonClick}
                    >
                        <UlText style={{fontSize: 20, fontWeight: "500", color: "#fff"}}>{buttonLabel}</UlText>
                        <TouchableOpacity
                            style={st.arrowIconWrapper}
                            onPress={onButtonClick}
                        >
                            <UlCustomIcon name={"fog-right"} color="#fff" size={20}/>
                        </TouchableOpacity>
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
};


const st = StyleSheet.create({
    listCard: {
        flex: 1,
        minWidth: "50%",
        margin: 5,
        paddingTop: 7,
        borderRadius: 10,
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.2,
        backgroundColor: "#fff",
        shadowRadius: 2,
        elevation: 3,
        shadowColor: "#676767",
    },

    mainLabel: {
        color: "#A1A2A3",
        fontSize: 16,
        marginLeft: 15,
        marginTop: 5,
        fontWeight: "500",
    },

    arrowIconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.2)",
    },
});
