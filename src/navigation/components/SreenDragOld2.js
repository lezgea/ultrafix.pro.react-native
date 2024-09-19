import React, {useRef, useEffect, useCallback, useMemo, useReducer} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Animated,
    PanResponder,
} from 'react-native';

import {Api} from "../../plugins";

export default function ScreenDrag()
{
    const [state, setState] = useReducer(
        (prevState, newState) => {
            return {...prevState, ...newState}
        },
        {
            progress: new Animated.Value(0),
        }
    );

    const scale = state.progress.interpolate({
        inputRange: [ 0, 1 ],
        outputRange: [ 1, 0.87],
    });

    const opacity = state.progress.interpolate({
        inputRange: [ 0, 1 ],
        outputRange: [ 0, 0.6 ],
    });

    const bgRadius = state.progress.interpolate({
        inputRange: [ 0, 1 ],
        outputRange: [ 0, 15 ],
    });

    const translateX = state.progress.interpolate({
        inputRange: [ 0, 1 ],
        outputRange: [ Api.screenWidth(), 0 ],
    });

    const translateY = state.progress.interpolate({
        inputRange: [ 0, 1 ],
        outputRange: [ Api.screenHeight(), 0 ],
    });

    useEffect(() => {
        Animated.parallel([
            Animated.timing(state.progress, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false
            }),
        ]).start();
    }, []);

    const isBackZone = useCallback(gesture => {
        const y = gesture.dy;
        return y > 200;
    }, []);

    const onMove = useCallback(
        (dy) => {
            let progress = 1-1*dy/800;
            state.progress.setValue(progress);
        },
        []
    );

    const panResponder = useMemo(
        () =>
            PanResponder.create({
                onMoveShouldSetResponderCapture: () => true,
                onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                    let dx = Math.abs(gestureState.dx);
                    let dy = Math.abs(gestureState.dy);
                    return  dy > 10 && gestureState.moveY< 500;
                },
                onPanResponderGrant: (evt, gestureState) => {
                    onMove(gestureState.dy);
                },

                onPanResponderMove: (evt, gestureState) => {
                    if(gestureState.dy < 1)
                        return false;
                    onMove(gestureState.dy);
                },
                onPanResponderRelease: (e, gesture) => {
                    if (isBackZone(gesture)) {
                        Animated.parallel([
                            Animated.timing(state.progress, {
                                toValue: 0,
                                duration: 300,
                                useNativeDriver: false
                            }),
                        ]).start();
                    } else {
                        Animated.parallel([
                            Animated.timing(state.progress, {
                                toValue: 1,
                                duration: 300,
                                useNativeDriver: false
                            }),
                        ]).start();
                    }
                },
            }),
        []
    );


    return (
        <View style={styles.mainContainer}>
            <Animated.View style={[styles.bgContainer, {opacity: opacity}]}/>

            <Animated.View style={[styles.currentScreenWrapper, {padding: 0}]}>
                <Animated.View style={[styles.currentScreen, {opacity: 1, transform: [{scale: scale}], borderRadius: bgRadius}]}>

                </Animated.View>
            </Animated.View>

                <TouchableOpacity style={{position: 'absolute', top: 100, width: 50, height: 50, backgroundColor: 'red'}} onPress={() => {
                    Animated.parallel([
                        Animated.timing(state.progress, {
                            toValue: 1,
                            duration: 300,
                            useNativeDriver: false
                        }),
                    ]).start();
                }}/>

                <Animated.View
                    {...panResponder.panHandlers}
                    style={[
                        //pan.current.getLayout(),
                        {
                            transform: [
                                {
                                    translateY: translateY
                                }
                            ],
                        },
                        styles.nextScreen]}>

                </Animated.View>

        </View>
    );
}


let styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    bgContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: 0.1
    },
    currentScreenWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    currentScreen: {
        flex: 1,
        backgroundColor: 'white',
    },
    draggableContainer: {
        position: 'absolute',
        top: 50,
        left: 0,
        width: '100%',
        height: '100%',
    },
    nextScreen: {
        backgroundColor: '#1abc9c',
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
});
