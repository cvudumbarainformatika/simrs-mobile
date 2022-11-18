
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext } from '../context/AuthContext'
import { AppLoader } from '../components'

import AppStack from './AppStack'
import AuthStack from './AuthStack'
import { Provider } from 'react-redux'
import { store } from '../redux'
import { navigationRef } from './RootNavigation'

const AppNav = () => {

  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
      return (<AppLoader visible={isLoading} />)
  }

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        { userToken !== null? <AppStack/> : <AuthStack /> }
      </NavigationContainer>
    </Provider>
  )
}

export default AppNav