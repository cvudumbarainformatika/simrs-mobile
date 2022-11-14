import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { IMGS, tw } from '../../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'

const HeaderUser = (props) => {
  return (
    <SafeAreaView style={tw`pt-2 bg-white shadow`}>
          <View style={tw`flex-row items-center mx-4 mb-2`}>
              <View style={tw`mr-2`}>
                  <View style={tw`h-10 w-10 bg-gray-light border-2 border-primary rounded-full overflow-hidden items-center justify-center`}>
                      <Image 
                            source={IMGS.avatarMale}
                            style={[tw`h-10 w-10`, {resizeMode:'cover'}]}
                        />
                  </View>
              </View>
                <View style={tw`flex-1`}>
                    <Text className="font-bold text-gray text-xs -mb-1">Selamat Datang, 👋</Text>
                    <View className="flex-row items-center"> 
                        <Text className="font-bold text-lg mr-1">Siapa Kamu?</Text>
                    </View>
              </View>
              <TouchableOpacity
                onPress={props.bellClick}
              >
                  <Icon name={'bell-outline'} size={32} color={tw.color('primary')} />
                  <View style={tw`h-4 w-4 rounded-full absolute bg-negative top-0 right-0`}>
                      <View style={tw`h-4 w-4 justify-center items-center`}>
                          <Text style={tw`text-white text-xs`}>1</Text>
                      </View>
                    </View>
              </TouchableOpacity>
        </View>
      </SafeAreaView>
  )
}

export default HeaderUser