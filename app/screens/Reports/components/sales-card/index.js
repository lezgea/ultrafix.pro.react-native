import {StyleSheet, View} from "react-native";
import React from "react";
import {CardSection} from "../card-section";


export const SalesCard = (props) => {
    let { data, index, color } = props;

    return (
        <View
            key={index}
            style={st.listCard}
        >
            {
                data.map((item, index) =>
                    <CardSection
                        key={index}
                        index={index}
                        label={item.label}
                        price={item.price}
                        color={item.color}
                    />
                )
            }
        </View>
    );
};


const st = StyleSheet.create({
    listCard: {
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
    },

});
