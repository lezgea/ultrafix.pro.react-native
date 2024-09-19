import * as Animatable from "react-native-animatable";
import UlCustomIcon from "../ul-custom-icon";
import {View} from "react-native";
import React from "react";


export const UlFooterLoading = () => {

    return(
        <View style={{flex: 1, alignItems: "center", justifyContent: "center", minHeight: 100}}>
            <Animatable.View
                animation="rotate"
                iterationCount="infinite"
                duration={800}
            >
                <UlCustomIcon name="fog-spinner-2" size={35} color="#c4c4c4"/>
            </Animatable.View>
        </View>
    )
}
