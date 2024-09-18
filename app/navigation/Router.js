'use strict';

import React, {useState} from 'react';

import {
    View,
} from 'react-native';

import { TabNavigator, StackNavigator, Toast } from "./index";


const Router = (props) => {
    return(
        <View style={{flex: 1}}>
            {
                props.tabs ?
                    <TabNavigator.View
                        {...props}
                        defaultTabIndex={0}
                        nameColor="#555"
                        nameColorSelected="#3479C1"
                        iconColor="#888"
                        iconColorSelected="#3479C1"
                    />
                    :
                    <StackNavigator.View
                        {...props}
                    />
            }

            <Toast.View/>

        </View>
    )

};

export default React.memo(Router);


