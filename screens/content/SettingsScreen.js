import { View, Text } from 'react-native'
import React from 'react'
import { tw } from '../../constants'
import { AppBtn } from '../../components'

const SettingsScreen = () => {
  return (
    <View style={tw`flex-1`}>
      <View style={tw`flex-1 justify-center items-center`}>
        <AppBtn label="Go To Settings Detail" />
        <View style={tw`mt-2`}>
          <AppBtn label="Logout" />
        </View>
      </View>
    </View>
  )
}

export default SettingsScreen