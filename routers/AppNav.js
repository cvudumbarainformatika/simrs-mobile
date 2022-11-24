
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext } from '../context/AuthContext'
import { AppAlert, AppLoader } from '../components'

import AppStack from './AppStack'
import AuthStack from './AuthStack'
import { Provider } from 'react-redux'
import { navigationRef } from './RootNavigation'
import store  from '../redux/store'

const AppNav = () => {

  const { isLoading, userToken, alerts, msgError, msgOk, closeAlerts, resetDevice } = useContext(AuthContext);

  if (isLoading) {
      return (<AppLoader visible={isLoading} />)
  }

  

  if (alerts) {
    if (msgOk !== null) {
      return (<AppAlert visible={alerts} status="Success" msg={msgOk} onOk={resetDevice}  /> )
    }
    return (<AppAlert visible={alerts} status="Error" msg={msgError} onOk={closeAlerts}  /> )
  }

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        {
          userToken !== null ? <AppStack /> : <AuthStack />
        }
      </NavigationContainer>
    </Provider>
  )
}

export default AppNav