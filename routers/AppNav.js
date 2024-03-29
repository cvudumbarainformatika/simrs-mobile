
import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext } from '../context/AuthContext'
import { AppAlert, AppLoader } from '../components'

import AppStack from './AppStack'
import AuthStack from './AuthStack'
import { Provider } from 'react-redux'
import { navigationRef } from './RootNavigation'
import store from '../redux/store'
import AppLoaderAnim from '../components/~global/AppLoaderAnim'
import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen_ from './SplashScreen_'

const AppNav = () => {

  const { isLoading, userToken, alerts, msgError, msgOk, closeAlerts, resetDevice } = useContext(AuthContext);

  // const [isSplash, setIsSplash] = useState(false)

  // function SplashScreen() {
  //   return (<AppLoaderAnim />);
  // }


  // useEffect(() => {
  //   // setTimeout(() => {
  //   //   setIsSplash(false)
  //   // },3000)
  // }, [])



  if (isLoading) {
    return (<AppLoaderAnim />)
  }



  if (alerts) {
    if (msgOk !== null) {
      return (<AppAlert visible={alerts} status="Success" msg={msgOk} onOk={resetDevice} />)
    }
    return (<AppAlert visible={alerts} status="Error" msg={msgError} onOk={closeAlerts} />)
  }

  // const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef} >
        {
          userToken !== null ? <AppStack /> : <AuthStack />
        }
      </NavigationContainer>
    </Provider>
  )
}

export default AppNav