import React, { useState } from 'react';
import { View, TouchableOpacity } from "react-native";
import { UlText } from "../../small";
import { FilledEllipsisVerticalIcon } from '@assets/icons';


export const UlDropdown = (props) => {
    let { options = [], children } = props;
    const [showDropdown, setShowDropdown] = useState(false)

    function getActionType(label) {
        switch (label) {
            case "Delete":
        }
    }


    return (
        <View>
            <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => setShowDropdown(!showDropdown)}>
                <FilledEllipsisVerticalIcon size={18} color={"#fff"} />
            </TouchableOpacity>
            {
                showDropdown &&
                <View style={{
                    flex: 1,
                    position: "absolute",
                    top: 30,
                    right: -3,
                    minWidth: 230,
                    height: "auto",
                    borderRadius: 7,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    backgroundColor: "#fff",
                    shadowRadius: 10,
                    elevation: 20,
                    shadowColor: "#000000",
                }}>
                    <View style={{ overflow: "hidden", borderRadius: 7, }}>
                        {
                            options?.map((option, index) =>
                                <UlOptionLine index={index}
                                    label={option.label}
                                    onPress={() => { option.action(); setShowDropdown(false) }}
                                />
                            )
                        }
                    </View>
                </View>
            }
        </View>
    )
}


const UlOptionLine = ({ index, label, onPress }) => {
    let icon = "fog-delete"
    let color = "#313131"
    let bg_color = "#fff"

    switch (label) {
        case "Delete":
            icon = "fog-delete";
            color = "#fff";
            bg_color = "#b01a1a"; break;
        case "Edit": icon = "fog-edit"; break;
    }

    return (
        <TouchableOpacity
            key={index}
            onPress={onPress}
            style={{ flexDirection: "row", alignItems: "center", padding: 15, backgroundColor: bg_color }}
        >
            {/* <UlCustomIcon name={icon} size={18} color={color}/> */}
            <UlText style={{ marginLeft: 10, fontSize: 18, color: color }}>{label}</UlText>
        </TouchableOpacity>
    )
}


