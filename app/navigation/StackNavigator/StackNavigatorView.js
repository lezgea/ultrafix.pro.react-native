'use strict';

import React, { useEffect, useReducer } from 'react';

import {
    registerBackHandler,
    unregisterBackHandler,
    CurrentScreen,
} from "./actions";
import ScreenTransition from "../transitions/ScreenTransition";
import { TabNavigator } from "../index";

function StackView(props) {
    const initialState = {
        transitionType: 'vertical',
        nextScreenVisible: false,
        lockTransition: false,
        duration: null,
        forward: {
            screen: false,
            params: false,
            settings: false
        }
    }
    const [state, setState] = useReducer((prevState, newState) => { return { ...prevState, ...newState } }, { ...initialState });
    let keyCount = 0;

    const navigate = {
        forward: (screen, params, settings) => {
            if (props.lockTransition)
                props.lockTransition();
            unregisterBackHandler(navigate);
            keyCount += 1;
            if (settings?.fullscreen)
                TabNavigator.hide();
            if (!settings)
                settings = {}
            if (props.forward?.settings?.fullscreen)
                settings['fullscreen'] = true;
            setState({
                forward: {
                    screen: screen,
                    params: params,
                    settings: settings
                },
                lockTransition: settings?.transition === 'locked',
                duration: (settings?.duration) ? settings?.duration : null,
                transitionType: settings?.slidefrom === 'right' ? 'horizontal' : 'vertical',
                nextScreenVisible: true,
            });
            return true;
        },
        back: (settings) => {
            if (props.onClose) {
                if (props.unlockTransition)
                    props.unlockTransition();
                props.onClose(settings);
            } else {
                props.onReset('Drive');
            }

            return true;
        },
        reset: (screen) => {
            props.onReset(screen);
        },
        restart: () => {
            props.onRestart();
        },
        preventBackButton: true
    };



    useEffect(() => {
        registerBackHandler(navigate);
        if (props.forward.duration !== 0)
            //setTimeout(() => startAnimate(props, styles), 50);
            return () => {
                unregisterBackHandler(navigate);
            }
    }, [])


    return (
        <ScreenTransition
            type={state.transitionType} // horizontal, vertical
            //onNextOpened={() => setState({nextScreenVisible: true})}
            onNextClosed={() => {
                if (props.unlockTransition)
                    props.unlockTransition();
                if (!props.forward?.settings?.fullscreen)
                    TabNavigator.show();
                registerBackHandler(navigate);
                setState({ nextScreenVisible: false, forward: false });
            }}
            nextVisible={state.nextScreenVisible}
            //duration={state.forward?.settings?.duration}
            duration={state.duration}
            locked={state.lockTransition}
            screen={state.forward?.screen}
            current={
                <CurrentScreen
                    {...props}
                    navigate={navigate}
                    onClose={() => { }}
                />
            }
            next={
                state.forward?.screen &&
                <StackNavigatorView
                    key={keyCount}
                    {...props}
                    navigate={navigate}
                    //navigation={{state: {params: state.forward?.params}}}
                    lockTransition={() => {
                        setState({ lockTransition: true })
                    }}
                    unlockTransition={() => {
                        setState({ lockTransition: false })
                    }}
                    forward={state.forward}
                    params={state.forward?.params}
                    onClose={(settings) => {
                        if (!props.forward?.settings?.fullscreen)
                            TabNavigator.show();
                        setState({ nextScreenVisible: false, duration: settings?.duration === 0 || settings?.duration > 0 ? settings?.duration : null })
                    }}
                />
            }
        />
    )
}

function areEqual(prevProps, nextProps) {
    return true;
}

const StackNavigatorView = React.memo(StackView, areEqual);

export default StackNavigatorView;
