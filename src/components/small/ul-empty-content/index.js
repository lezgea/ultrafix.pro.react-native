import React from 'react'
import { View } from "react-native";
import { IconNoData } from "../../../assets";
import VX from "../../../plugins/vx";
import { UlText } from "../ul-text";


export const UlEmptyContent = () => {
    return (
        <View style={{ opacity: 0.1, width: VX.screenWidth(), minHeight: VX.screenHeight() - 300, alignItems: "center", justifyContent: "center" }}>
            <IconNoData height={100} width={100} />
            <UlText style={{ marginTop: 15, fontSize: 18, fontWeight: "600" }}>No Data</UlText>
        </View>
    )
}
