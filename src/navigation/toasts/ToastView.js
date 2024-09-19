import React, {useReducer, useEffect} from 'react';
import {
    Animated,
    TouchableOpacity,
    View,
    Text,
    StyleSheet
} from 'react-native';
import Model from "./Model";
import {CustomIcon} from "../../components";

export default function ToastView(props)
{
    const [state, setState] = useReducer(
        (prevState, newState) => {
            return {...prevState, ...newState}
        },
        {
            toasts: [],
            progress: new Animated.Value(0),
        }
    );

    useEffect(() => {
        Model.state = state;
        Model.setState = setState;
    }, []);

    return(
        <>
            {
                state.toasts.map((value, i) => (
                    <ToastBody
                        key={value.id}
                        {...value}
                    />
                ))
            }
        </>
    );
}





function ToastBody({id, visible, icon, message, position, duration, bgColor, autoClose})
{
    const [state, setState] = useReducer(
        (prevState, newState) => {
            return {...prevState, ...newState}
        },
        {
            scale: new Animated.Value(0.3),
        }
    );

    useEffect(() => {
        if(visible){
            Animated.parallel([
                Animated.timing(state.scale, {
                    toValue: 1,
                    duration: duration,
                    useNativeDriver: true
                })
            ]).start(() => {
                if (autoClose)
                    setTimeout(() => Model.hide(id), 3000)
            });
        }else{
            Animated.parallel([
                Animated.timing(state.scale, {
                    toValue: 0,
                    duration: duration,
                    useNativeDriver: true
                })
            ]).start(() => Model.terminate(id));
        }

    }, [visible])

    return(
        <Animated.View
            style={[
                styles.bodyAnimated,
                {transform: [{scale: state.scale}]},
                position === 'top' ? {top: 50} : {bottom: 50}
            ]}
        >
            <View style={{...styles.body, backgroundColor: bgColor}}>
                <Text style={styles.text}>{message}</Text>
                <TouchableOpacity style={styles.close} onPress={() => Model.hide(id)}>
                    <CustomIcon name={'fog-x'} color="white" size={16}/>
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}

let styles = StyleSheet.create({
    bodyAnimated: {
        position: 'absolute',
        left: 0,
        width: '100%',
        flexDirection: 'row'
    },
    body: {
        flex: 1,
        borderRadius: 10,
        marginHorizontal: 20,
        minHeight: 70,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        opacity: 0.98
    },
    text: {
        flex: 1,
        fontSize: 17,
        color: 'white',
        marginVertical: 10
    },
    close: {
        width: 50,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
