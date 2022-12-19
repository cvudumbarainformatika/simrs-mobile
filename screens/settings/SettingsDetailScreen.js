import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { ROUTES, tw } from '../../constants'
import { AppBtn, AppInput } from '../../components'
import { SafeAreaView } from 'react-native-safe-area-context'

const SettingsDetailScreen = ({navigation}) => {
  return (
      <ScrollView>
      <SafeAreaView className="flex-1">
        <View className="flex-row items-center m-4">
          <AppBtn icon="chevron-left" color="dark" round clicked={ ()=> navigation.goBack() } />
          <Text className="ml-2 font-poppins">Back to Profile</Text>
        </View>
        <View className="m-4">
          <Text className="font-poppinsBold">Form Ganti Password</Text>
          <AppInput label="password Baru" />
        </View>
      </SafeAreaView>
      
      </ScrollView>
    
  )
}

export default SettingsDetailScreen