import React from 'react'

import { ROUTES } from '../constants';
import { TRANSITION_HORIZONTAL } from '../constants/transitions';
import { createStackNavigator } from '@react-navigation/stack';
import SetJadwalAwalScreen from '../screens/jadwal/SetJadwalAwalScreen';
import PilihJadwalScreen from '../screens/jadwal/PilihJadwalScreen';


const Stack = createStackNavigator();

const SetJadwalNavigator = () => {
  // console.log(Stack)
  return (
      <Stack.Navigator 
          screenOptions={{
            headerShown: false,
            gestureDirection: 'horizontal',
            
      }}
      initialRouteName={ROUTES.JADWAL_SET}
    >
      <Stack.Screen name={ROUTES.JADWAL_SET} component={SetJadwalAwalScreen} />
      <Stack.Screen name={ROUTES.JADWAL_SET_PILIH} component={PilihJadwalScreen} options={TRANSITION_HORIZONTAL} />
      
    </Stack.Navigator>
  )
}
export default SetJadwalNavigator