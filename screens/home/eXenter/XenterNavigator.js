import { Easing } from 'react-native'
import React, { useEffect } from 'react'

import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { ROUTES } from '../../../constants';
import XenterScreen from './XenterScreen';
import KirimQr from './KirimQr';
import UploadDokumenPoli from '../eUpload/UploadDokumenPoli';
import HomeScreenV2 from '../../content/HomeScreenV2';
import { closeSring, openSring, TRANSITION_HORIZONTAL } from '../../../constants/transitions';
import HomeNavigator from '../../../routers/HomeNavigator';
import BottomTabNavigator from '../../../routers/BottomTabNavigator';


// TRANSITIONS =======================

const Stack = createStackNavigator();
const XenterNavigator = () => {
    // console.log(Stack)
    return (
        <Stack.Navigator
            screenOptions={{
                presentation: 'modal',
                gestureEnabled: true,
                headerShown: false,
                gestureDirection: 'horizontal',
                transitionSpec: {
                    open: openSring,
                    close: closeSring
                },
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            initialRouteName={ROUTES.XENTER}
        >

            <Stack.Screen name={ROUTES.XENTER} component={XenterScreen} options={{
                unmountOnBlur: true,
            }} />
            <Stack.Screen name={ROUTES.KirimQr} component={KirimQr} />
            <Stack.Screen name={ROUTES.HOME} component={BottomTabNavigator} />
            {/* <Stack.Screen name={ROUTES.UPLOAD_DOK_POLI} component={UploadDokumenPoli} /> */}

        </Stack.Navigator>
    )
}
export default XenterNavigator