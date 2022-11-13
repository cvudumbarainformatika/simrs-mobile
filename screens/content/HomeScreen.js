import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { IMGS, tw } from '../../constants'
import { HeaderUser } from '../../components'

const HomeScreen = () => {
  return (
    <View style={tw`flex-1 bg-gray-light`}>
      <HeaderUser />
        {/* CONTENT */}
      <ScrollView style={tw`p-4`}>
        <Text>Hallooo, ini persiapan conten Home</Text>
      </ScrollView>
    </View>
  )
}

export default HomeScreen