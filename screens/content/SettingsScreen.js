import { View, Text } from 'react-native'
import React from 'react'
import { ROUTES, tw } from '../../constants'
import { AppBtn } from '../../components'

const SettingsScreen = ({navigation}) => {
  return (
    <View style={tw`flex-1`}>
      <View style={tw`flex-1 justify-center items-center`}>
        <AppBtn label="Go To Settings Detail"
          clicked={()=> navigation.navigate(ROUTES.SETTINGS_DETAIL)}
        />
        <View style={tw`mt-2`}>
          <AppBtn label="HOME"
            clicked={()=> navigation.navigate(ROUTES.HOME_TAB)}
          />
        </View>
      </View>
    </View>
  )
}

export default SettingsScreen