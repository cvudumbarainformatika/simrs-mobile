import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ROUTES } from '../constants'
import { TRANSITION_HORIZONTAL } from '../constants/transitions'
import { LoginScreen, RegisterScreen, RegistrasiPasswordScreen } from '../screens'
import Logout from '../screens/Logout'
import { AuthContext } from '../context/AuthContext'


const AuthStack = () => {

    const {isSignout} = useContext(AuthContext)
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator
            screenOptions={{
                gestureEnabled: true,
                headerShown: false,
                gestureDirection: 'horizontal',
            }}
            initialRouteName={ROUTES.LOGIN}
        >
        <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} options={[
          TRANSITION_HORIZONTAL,
          {
            animationTypeForReplace: isSignout? 'pop' : 'push',
          }
        ]} />
        <Stack.Screen name={ROUTES.LOGOUT} component={Logout} options={TRANSITION_HORIZONTAL} />
        <Stack.Screen name={ROUTES.REGISTER} component={RegisterScreen} options={TRANSITION_HORIZONTAL} />
        <Stack.Screen name={ROUTES.REGISTRASIPASSWORD} component={RegistrasiPasswordScreen}
        options={[
          TRANSITION_HORIZONTAL,
          ({route}) => ({
            title: route.params.userId
          })
        ]}
      />    
    </Stack.Navigator>
    )
}

export default AuthStack