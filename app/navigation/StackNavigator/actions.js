import React from 'react';
import {BackHandler} from "react-native";
import Screens from "../config";

export function registerBackHandler(navigate)
{
    if (navigate && navigate.back)
        BackHandler.addEventListener('hardwareBackPress', () => handleBackPress(navigate));
}

export function unregisterBackHandler(navigate)
{
    if (navigate && navigate.back)
        BackHandler.removeEventListener('hardwareBackPress');
}


export function handleBackPress(navigate)
{
    if(navigate && navigate.back){
        navigate.back();
        return true;
    }else{
        //  BackHandler.exitApp();
        return false;
    }
}


export const CurrentScreen = React.memo((props) =>
{
    let Screen = false;
    if(typeof props.forward?.screen !== "string" && typeof props.forward?.screen !== "undefined"){
        Screen = props.forward?.screen;
    }else if (props.forward && Screens[props.forward?.screen]){
        Screen = Screens[props.forward?.screen];
    }else if (props.screen){
        Screen = Screens[props.screen];
    }
    return <Screen {...props}/>;
}, () => {return true});
