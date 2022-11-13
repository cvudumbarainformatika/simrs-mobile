import { View, Text } from 'react-native'
import React from 'react'
import { ROUTES, tw } from '../../constants'
import { AppBtn } from '../../components'

const SettingsDetailScreen = ({navigation}) => {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
          <Text>SettingsDetailScreen</Text>
          <AppBtn label="Go Back" clicked={ ()=>navigation.goBack() } />
    </View>
  )
}

export default SettingsDetailScreen