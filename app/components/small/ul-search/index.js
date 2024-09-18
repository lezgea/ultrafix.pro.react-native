import {View} from "react-native";
import {FC} from "react";
import React from 'react';


const UlSearch = ({className, placeholder, onChangeHandler}) => {
    return(
        <View>
            <input
                className={className}
                placeholder={placeholder}
                onChange={onChangeHandler}
            />
        </View>
    )
}

