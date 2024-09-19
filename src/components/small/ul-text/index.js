import React from 'react';
import { Text } from 'react-native';


export const UlText = (props) => {
    let fontFamily;
    if (props.style && props.style.fontWeight && props.style.fontWeight === "bold") {
        fontFamily = "Roboto-Medium"
    } else if (props.style && props.style.fontWeight && props.style.fontWeight === "light") {
        fontFamily = "Roboto-Light"
    } else {
        fontFamily = "Roboto-Regular"
    }

    return (
        <Text {...props} style={[props.style, {fontFamily: fontFamily}]}>
            {props.children}
        </Text>
    );
};

