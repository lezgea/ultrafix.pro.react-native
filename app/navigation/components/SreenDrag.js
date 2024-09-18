import React from 'react';
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity
} from 'react-native';

import ScreenTransition from "../transitions/ScreenTransition";

export default function ScreenDrag()
{
    const [visible, setVisible] = React.useState(true);
    const [type, setType] = React.useState('vertical');

    return (
        <View style={{flex: 1}}>

            <ScreenTransition
                type={type}
                onOpened={() => setVisible(true)}
                onClosed={() => setVisible(false)}
                nextVisible={visible}
                duration={350}
                current={
                    <View style={{flex: 1, backgroundColor: 'white'}}>
                        <ScrollView key={1}  style={{flex: 1}}>
                            {
                                [1,2,3,4,5,6,7,8,9,10,11,12].map((v, i) => (
                                    <View key={i} style={{height: 200, width: '100%', backgroundColor: '#e1e1e1',marginBottom: 20,marginRight: 20}}/>
                                ))
                            }
                        </ScrollView>
                    </View>
                }
                next={
                    <View style={{flex: 1, backgroundColor: 'white'}}>
                        <ScrollView key={2}  style={{flex: 1, paddingTop: 300}} horizontal={type === 'horizontal'} >
                            {
                                [1,2,3,4,5,6,7,8,9,10,11,12].map((v, i) => (
                                    <View key={i} style={{height: 200, width: type === 'horizontal' ? 300: '100%', backgroundColor: '#e1e1e1',marginBottom: 20,marginRight: 20}}/>
                                ))
                            }
                        </ScrollView>
                    </View>
                }
            />

            <TouchableOpacity
                style={{position: 'absolute', bottom: 200, width: 50, height: 50, backgroundColor: 'purple'}}
                onPress={() => {setVisible(true);setType('vertical')}}><Text>Vertical Open</Text></TouchableOpacity>
            <TouchableOpacity
                style={{position: 'absolute', bottom: 100, width: 50, height: 50, backgroundColor: 'purple'}}
                onPress={() => {setVisible(false);setType('vertical')}}><Text>Vertical Close</Text></TouchableOpacity>


            <TouchableOpacity
                style={{position: 'absolute', bottom: 200, right: 0, width: 50, height: 50, backgroundColor: 'purple'}}
                onPress={() => {setVisible(true);setType('horizontal')}}><Text>Horizontal Close</Text></TouchableOpacity>

            <TouchableOpacity
                style={{position: 'absolute', bottom: 100, right: 0, width: 50, height: 50, backgroundColor: 'purple'}}
                onPress={() => {setVisible(false);setType('horizontal')}}><Text>Horizontal Close</Text></TouchableOpacity>

        </View>
    );
}
