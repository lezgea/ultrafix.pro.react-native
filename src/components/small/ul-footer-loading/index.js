import * as Animatable from "react-native-animatable";
import { View } from "react-native";
import React from "react";
import { SpinnerIcon } from "@assets/icons";


export const UlFooterLoading = () => {

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", minHeight: 100 }}>
            <Animatable.View
                animation="rotate"
                iterationCount="infinite"
                duration={800}
            >
                <SpinnerIcon size={35} color="#c4c4c4" />
            </Animatable.View>
        </View>
    )
}
