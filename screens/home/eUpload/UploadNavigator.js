import { Easing } from 'react-native'
import React, { useEffect } from 'react'

import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { ROUTES } from '../../../constants';
import UploadDokumenPoli from '../eUpload/UploadDokumenPoli';
import HomeScreenV2 from '../../content/HomeScreenV2';
import { closeSring, openSring, TRANSITION_HORIZONTAL } from '../../../constants/transitions';
import DetailPasienUpload from './DetailPasienUpload';
import { useSelector } from 'react-redux';


// TRANSITIONS =======================
const config = {
  animation: 'spring',
  config: {
    stiffness: 200,
    damping: 80,
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 200,
    easing: Easing.back(),
  }
}

const transition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: config,
    close: closeConfig
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
}


// console.log('upload nav',)

const Stack = createStackNavigator();
const UploadNavigator = () => {

  // const { date, tglAwal, tglAkhir, page, q, category, kodepoli, pasiens, waiting } = useSelector(state => state.pasien)

    // console.log('from navigator', category)
    return (
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: true,
            headerShown: false,
            gestureDirection: 'horizontal',
          }}
          initialRouteName={ROUTES.UPLOAD_DOK_POLI}
        >

            <Stack.Screen name={ROUTES.HOME} component={HomeScreenV2} options={transition}/>
            <Stack.Screen name={ROUTES.UPLOAD_DOK_POLI} component={UploadDokumenPoli} options={transition} />
            <Stack.Screen name={ROUTES.UPLOAD_DET_PASIEN} component={DetailPasienUpload} options={transition} />

        </Stack.Navigator>
    )
}
export default UploadNavigator