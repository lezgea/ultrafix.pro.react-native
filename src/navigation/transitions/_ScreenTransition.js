import React, {useEffect, useCallback, useMemo, useReducer} from 'react';
import {
    StyleSheet,
    View,
    Animated,
    PanResponder,
    Easing,
} from 'react-native';

import {Api} from "../../plugins";

function ScreenTransition(props)
{
    /*
    props:
    type: horizontal / vertical
    locked: 0/1
    duration: integer, animation duration
     */
    const [state, setState] = useReducer(
        (prevState, newState) => {
            return {...prevState, ...newState}
        },
        {
                progress: new Animated.Value(0),
        }
    );

    let backPosition = props.type === 'horizontal' ? 40: 70;
    let touchstartPosition = props.type === 'horizontal' ? 80: 150;

    const opacity = state.progress.interpolate({
        inputRange: [ 0, 1 ],
        outputRange: [ 0, 0.4 ],
        useNativeDriver: true,
    });

    const nextOpacity = state.progress.interpolate({
        inputRange: [ 0, 1 ],
        outputRange: [ 0, 0.3 ],
        useNativeDriver: true,
    });

    const scale = state.progress.interpolate({
        inputRange: [ 0, 1 ],
        outputRange: [ 1, 0.9],
        useNativeDriver: true,
    });

    const nextScale = state.progress.interpolate({
        inputRange: [ 0, 1 ],
        outputRange: [ 0.80, 1],
        useNativeDriver: true,
    });

    const currentRadius = state.progress.interpolate({
        inputRange: [ 0, 0.01, 1 ],
        outputRange: [ 0, 10, 20 ],
    });

    const nextRadius = state.progress.interpolate({
        inputRange: [ 0, 0.9, 1 ],
        outputRange: [ 30, 20, 0 ],
    });

    const translateY = state.progress.interpolate({
        inputRange: [ 0, 1 ],
        outputRange: [ Api.screenHeight(), 0 ],
        useNativeDriver: true,
    });

    const translateX = state.progress.interpolate({
        inputRange: [ 0, 1 ],
        outputRange: [ Api.screenWidth(), 0 ],
        useNativeDriver: true,
    });


    useEffect(() => {
        if(!!props.nextVisible && !state.visible){
            setTimeout(() => openNextScreen(), 30);
        }else if(!props.nextVisible && state.visible){
            closeNextScreen();
        }
    }, [props.nextVisible]);



    const openNextScreen = useCallback(async () => {
        let duration = 250;
        if(props.duration === 0 || props.duration > 0)
            duration = parseInt(props.duration);
        await setState({visible: true});
        Animated.parallel([
            Animated.timing(state.progress, {
                toValue: 1,
                duration: duration,
                easing: Easing.poly(.2,.1,2.9,.1),
                useNativeDriver: false
            }),
        ]).start(() => {
            if(props.onNextOpened)
                props.onNextOpened()
        });
    }, [props.duration]);

    const closeNextScreen = useCallback((fromPan=false, speed=1) => {
        let duration = 250;
        if(speed > 1)
            duration = duration/speed;
        if(!fromPan && props.duration === 0 || props.duration > 0)
            duration = parseInt(props.duration);
        Animated.parallel([
            Animated.timing(state.progress, {
                toValue: 0,
                duration: duration,
                easing: Easing.poly(.3,.1,2.7,.9),
                useNativeDriver: false
            }),
        ]).start(() => {
            setState({visible: false});
            if(props.onNextClosed)
                props.onNextClosed();
        });
    }, [props.duration, props.nextVisible]);

    const onMove = useCallback(
        (xy) => {
            let progress = 1-1*xy/(props.type === 'horizontal' ? Api.screenWidth(): Api.screenHeight());
            state.progress.setValue(progress);
        },
        [props.type]
    );

    function onRelease(gestureState) {
        let xy = props.type === 'horizontal' ? gestureState.dx: gestureState.dy;
        if (xy > backPosition) {
            let speed = props.type === 'horizontal' ? gestureState.vx: gestureState.vy;
            //let speed = veloXY/2;
            closeNextScreen(true, speed);
        } else {
            openNextScreen();
        }
    }

    const panResponder = useMemo(
        () =>
            PanResponder.create({
                //onStartShouldSetPanResponderCapture: () => (props.locked) ? false: true, // blocks all touches
                onMoveShouldSetResponderCapture: () => (props.locked) ? false: true,
                onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                    if(props.locked)
                        return false;
                    let xy = props.type === 'horizontal' ? gestureState.dx: gestureState.dy;
                    let moveXY = props.type === 'horizontal' ? gestureState.moveX: gestureState.moveY;
                    return  xy > 10 && moveXY < touchstartPosition
                },
                onPanResponderGrant: (evt, gestureState) => {
                    let xy = props.type === 'horizontal' ? gestureState.dx: gestureState.dy;
                    onMove(xy);
                },

                onPanResponderMove: (evt, gestureState) => {
                    let xy = props.type === 'horizontal' ? gestureState.dx: gestureState.dy;
                    if(xy < 1)
                        return false;
                    onMove(xy);
                },
                onPanResponderRelease: (e, gestureState) => {
                    onRelease(gestureState);
                },
                onPanResponderTerminationRequest: (e, gestureState) => {
                    onRelease(gestureState);
                },
            }),
        [touchstartPosition, backPosition, props.locked, props.type]
    );






    return (
        <View style={styles.mainContainer}>

            <Animated.View style={[styles.bgContainer, {opacity: opacity}]}/>

            <Animated.View
                style={[
                    styles.currentScreen,
                    {
                        transform: [
                            {
                                scale: scale
                            }
                        ],
                        borderRadius: currentRadius
                    }
                ]}>
                {props.current}
            </Animated.View>

            {!!props.next && <Animated.View style={[styles.bgContainer, {opacity: nextOpacity}]}/>}

            <Animated.View
                {...panResponder.panHandlers}
                style={[
                    styles.nextScreen,
                    {
                        transform: [
                            props.type === 'horizontal' ? {translateX: translateX}: {translateY: translateY},
                            {
                                scale: nextScale
                            }
                        ],
                        borderRadius: nextRadius
                    }
                ]}>

                {props.next}

            </Animated.View>

        </View>
    );
}
export default React.memo(ScreenTransition);

let styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        //backgroundColor: 'white',
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
    currentScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        //backgroundColor: 'white',
        overflow: 'hidden',
    },
    nextScreen: {
        //backgroundColor: '#1abc9c',
        width: '100%',
        height: '100%',
        borderRadius: 15,
        overflow: 'hidden',
    },
});
