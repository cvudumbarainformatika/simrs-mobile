import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ROUTES } from '../constants'
import BottomTabNavigator from './BottomTabNavigator'
import { TRANSITION_HORIZONTAL } from '../constants/transitions'
import Logout from '../screens/Logout'
import Timeout from '../screens/Timeout'
import { useDispatch, useSelector } from 'react-redux'
import SetJadwalAwalScreen from '../screens/home/SetJadwalAwalScreen'
import PilihKategoriJadwal from '../screens/home/PilihKategoriJadwal'
import { getJadwalsAsync } from '../redux/features/jadwal/jadwalsReducer'
import AppLoaderAnim from '../components/~global/AppLoaderAnim'
import { LoginScreen } from '../screens'

const AppStack = () => {

  const dispatch = useDispatch()
  const { jadwals, loading } = useSelector(state => state.jadwal)

  // React.useMemo(() => dispatch(getKategoriesAscync()), [])
  useEffect(() => {
    const bootStrapAsynch = () => {
      dispatch(getJadwalsAsync())
    }
  
    bootStrapAsynch()

    console.log('JADWALS :', jadwals.length)
    // console.log('KATEGORIES :', kategories)
  }, [jadwals.length])

  const Stack = createStackNavigator()


  

  return (
    <>
      {loading && (<AppLoaderAnim visible={loading} />)}
      
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
        gestureDirection: 'horizontal',
      }}
      initialRouteName={ROUTES.HOME}
    >
        {jadwals.length > 0 ? (
          <Stack.Screen name={ROUTES.HOME} component={BottomTabNavigator} initialParams={{ jadwals }} />
        ) :
        (
          <>
            <Stack.Screen name={ROUTES.SET_JADWAL_AWAL} component={SetJadwalAwalScreen} options={TRANSITION_HORIZONTAL} initialParams={{ jadwals }} />
              <Stack.Screen name={ROUTES.PILIH_KATEGORI_JADWAL_AWAL} component={PilihKategoriJadwal} options={TRANSITION_HORIZONTAL} />
              <Stack.Screen name={'BottomNavigator'} component={BottomTabNavigator} options={TRANSITION_HORIZONTAL} />
              <Stack.Screen name={ROUTES.LOGOUT} component={Logout} options={TRANSITION_HORIZONTAL} />
              <Stack.Screen name={'login_2'} component={LoginScreen} options={TRANSITION_HORIZONTAL} />
          </>
        )}
        {/* <Stack.Screen name={ROUTES.SET_JADWAL_AWAL} component={SetJadwalAwalScreen} options={TRANSITION_HORIZONTAL} initialParams={{ jadwals }} />
        <Stack.Screen name={ROUTES.PILIH_KATEGORI_JADWAL_AWAL} component={PilihKategoriJadwal} options={TRANSITION_HORIZONTAL} /> */}
        {/* <Stack.Screen name={ROUTES.HOME} component={BottomTabNavigator} initialParams={{ jadwals }} />
        <Stack.Screen name={'BottomNavigator'} component={BottomTabNavigator} options={TRANSITION_HORIZONTAL} />
        <Stack.Screen name={ROUTES.LOGOUT} component={Logout} options={TRANSITION_HORIZONTAL} /> */}
        <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} options={TRANSITION_HORIZONTAL} />
      <Stack.Screen name={ROUTES.ERROR_TIMEOUT} component={Timeout} options={TRANSITION_HORIZONTAL} />
      </Stack.Navigator>
    </>
  )
}

export default AppStack