import React from 'react'
import * as Animatable from "react-native-animatable";
import UlCustomIcon from "../ul-custom-icon";
import {Dimensions, View} from "react-native";
const {height, width} = Dimensions.get('window');


export const UlLoading = () => {
    return(
        <View style={{flex: 1, paddingBottom: height/3, zIndex: 5, position: "absolute", width: width, height: height, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,.5)"}}>
            <Animatable.View
                animation="rotate"
                iterationCount="infinite"
                duration={800}
            >
                <UlCustomIcon name="fog-spinner-2" size={50} color={"#4c9aff"}/>
            </Animatable.View>
        </View>
    )
}
