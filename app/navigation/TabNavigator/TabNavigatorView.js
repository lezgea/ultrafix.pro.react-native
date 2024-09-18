'use strict';

import React, {useReducer, useCallback} from 'react';
import {
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    View,
    Platform,
    Animated, Easing,
} from 'react-native';

import { StackNavigator } from "../index";
import CustomIcon from "../../components/small/CustomIcon";
import Index from "../../components/small/ul-text";
import Api from "../../plugins/Api";
import Model from "./Model";

const dim = Dimensions.get('window');
const tabHeight     = 70;
const maxTabWidth   = 100;


function TabNavigatorView (props)
{
    const tabWidth =  getTabWidth(props.tabs);
    const initialState = {
        animatedValue: new Animated.Value(-50),
        tabWidth: tabWidth,
        selectedIndex: props.defaultTabIndex > 0 ? props.defaultTabIndex : 0,
        left: new Animated.Value(getTabMarginLeft(0, props.tabs, tabWidth)),
        bottom: 0,
        renderedTabs: {
            0: true
        }
    }
    const [state, setState] = useReducer((prevState, newState) => {return {...prevState, ...newState}}, {...initialState});

    const tabPressed = useCallback((i) => {
        state.renderedTabs[i] = true;
        setState({selectedIndex: i, renderedTabs: state.renderedTabs});

        Animated.parallel([
            Animated.timing(state.left, {
                toValue: getTabMarginLeft(i, props.tabs, state.tabWidth),
                duration: 400,
                easing: Easing.elastic(),
                useNativeDriver: true
            }),
        ]).start(() => {

        });
    }, [])

    Model.hideTabs = useCallback(() => {
        setState({bottom: 0-tabHeight});
    }, [])


    Model.showTabs = useCallback(() => {
        setState({bottom: 0});
        return 1;
    }, [])


    function renderTabScreen(tab, i) {
        if(!state.renderedTabs[i])
            return null;
        return (
            <View key={i} style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                bottom: 0,
                left: state.selectedIndex === i ? 0 : dim.width
            }}>
                <StackNavigator.View
                    onReset={props.onReset}
                    onRestart={props.onRestart}
                    preventBackButton={true}
                    screen={tab.screenName}
                    forward={false}
                />
            </View>
        );
    }


    const iconColor = props.iconColor || "#666";
    const iconColorSelected = props.iconColorSelected || "#3479C1";

    return (
        <View style={styles.container}>
            <View style={styles.screenBody}>
                {
                    props.tabs && props.tabs.map((value, i) => (
                        renderTabScreen(value, i)
                    ))
                }
            </View>

            <View style={[
                styles.tabLine,
                {
                    bottom: state.bottom
                }]}>

                <View style={styles.tabsBgLine}>
                    <Animated.Image
                        style={[
                            styles.image,
                            {
                                width: state.tabWidth,
                                height: state.tabWidth,
                                transform: [{translateX: state.left}]
                            }
                        ]}
                        source={require("../../assets/img/menubg.png")}/>
                </View>


                <View style={styles.tabs}>
                    {
                        props.tabs && props.tabs.map((value, i) => (
                            <View key={i} style={[styles.tabColumn]}>
                                <TouchableWithoutFeedback onPress={() => tabPressed(i)}>
                                    <View style={[styles.tabBtn, state.selectedIndex === i ? styles.selectedTab : null]}>
                                        <View style={styles.iconLine}>
                                            <CustomIcon
                                                size={25}
                                                name={value.icon}
                                                color={value.color ? value.color: state.selectedIndex === i ? iconColorSelected : iconColor}
                                            />
                                        </View>

                                        {
                                            !!value.name &&
                                            <Index style={[styles.tabName, {color: state.selectedIndex === i ? iconColorSelected : iconColor}]}>
                                                {value.name}
                                            </Index>
                                        }
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        ))
                    }
                </View>
            </View>
        </View>
    )
}

export default React.memo(TabNavigatorView);

function getTabWidth(tabs) {
    let tabWidth = (Api.screenWidth() - 20) / tabs.length;
    tabWidth = tabWidth > maxTabWidth ? maxTabWidth : tabWidth;
    return tabWidth;
}

function getTabMarginLeft(i, tabs, tabWidth) {
    let realTabWidth = (Api.screenWidth() - 20) / tabs.length;
    let flexGap = (Api.screenWidth() - 20 - tabs.length * realTabWidth) / tabs.length;

    let centerPoint = 10 + flexGap * i + i * realTabWidth + realTabWidth / 2;
    let marginLeft = centerPoint - tabWidth / 2;
    return marginLeft;
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left:0,
        right: 0,
        top: 0,
        flexDirection: 'column',
        height: '100%',
        minHeight: dim.height-100
    },
    image: {
        width: 110,
        height: 110,
    },
    screenBody: {
        flex: 1,
        //paddingBottom: tabHeight,
    },
    tabsBgLine: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    tabLine: {
        position: 'absolute',
        width: '100%',
        left: 0,
        height: tabHeight,
        padding: 0,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        opacity: 0.95,
    },
    tabsBg: {
        marginTop: Platform.OS === 'ios' ? 25 : 20,
        flex: 1,
        borderColor: '#F1F1F1',
        borderTopWidth: 1,


        shadowColor: '#C1C1C1',
        shadowOffset: {
            width: -1,
            height: -5
        },
        shadowRadius: 10,
        shadowOpacity: 0.06,
    },
    tabs: {
        flex: 1,
        flexDirection: 'row',
        top: 0,
        left: 0,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    tabColumn: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        //backgroundColor: 'yellow',
        //width: 110,
        flex: 1,
    },
    tabBtn: {
        marginBottom: 0,
        width: '100%',
        flexDirection: 'column',
    },
    iconLine: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    tabName: {
        width: '100%',
        textAlign: 'center',
        fontSize: 13,
        color: '#686868',
        marginTop: 6,
    }
});



