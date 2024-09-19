import * as Animatable from "react-native-animatable";
import {View, Dimensions} from "react-native";
import React from "react";
import UlCustomIcon from "../../small/ul-custom-icon";
import {UlLoading} from "../../small";
import {IconNoData} from "../../../assets";
import variables from "../../../config/variables";



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export const UlContentLoader = (props) => {
    let {loading = false, children} = props

    if (loading)
        return(
            <View style={{flex: 1, minHeight: windowHeight, alignItems: "center", justifyContent: "center", backgroundColor: "#eeeeee"}}>
                <Animatable.View
                    animation="rotate"
                    iterationCount="infinite"
                    duration={800}
                >
                    <UlCustomIcon name="fog-spinner-2" size={50} color="#c4c4c4"/>
                </Animatable.View>
            </View>
        )

    return (
        <View style={{paddingTop: variables.headerHeight, minHeight: windowHeight, paddingBottom: variables.tabBarHeight}}>
            {children}
        </View>
    )
}
