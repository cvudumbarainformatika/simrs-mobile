
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext } from '../context/AuthContext'
import { AppLoader } from '../components'

import AppStack from './AppStack'
import AuthStack from './AuthStack'

const AppNav = () => {

  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
      return (<AppLoader visible={isLoading} />)
  }

  return (
    <NavigationContainer>
      { userToken === null? <AuthStack /> : <AppStack/> }
    </NavigationContainer>
  )
}

export default AppNav