import { View, Text, Image } from 'react-native'
import React from 'react'
import { IMGS, tw } from '../../../constants'

const HeaderUser = () => {
  return (
    <View style={tw`bg-white pt-4`}>
        <View style={tw`flex-row items-center mx-4 mb-2 pt-5`}>
          <Image 
              source={IMGS.avatarMale}
              style={tw`h-8 w-8 bg-gray-300 rounded-full`}
          />
          <View style={tw`flex-1 px-2`}>
              <Text className="font-bold text-gray-400 text-xs -mb-1">Selamat Datang,</Text>
              <View className="flex-row items-center"> 
                  <Text className="font-bold text-lg">Siapa Kamu?</Text>
              </View>
          </View>
        </View>
      </View>
  )
}

export default HeaderUser