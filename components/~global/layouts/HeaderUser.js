import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { IMGS, tw } from '../../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../../../context/AuthContext'

const HeaderUser = (props) => {

  const { pegawai } = useContext(AuthContext)

  return (
    <>
      <SafeAreaView style={tw`pt-1 bg-${props.bg ? props.bg : 'primary'} shadow`}>
        <View style={tw`flex-row items-center mx-4 mb-2`}>
          <View style={tw`mr-2`}>
            <View style={tw`h-10 w-10 bg-gray-light border-2 border-gray-light rounded-full overflow-hidden items-center justify-center`}>
              <Image
                source={pegawai
                  ? pegawai.foto === '' || pegawai.foto === null
                    // ? IMGS.avatarMale : { uri: `${PATH_IMG100}/${pegawai.nip}/${pegawai.foto}` }
                    ? IMGS.avatarMale :{uri:`${pegawai.foto_pegawai}`}
                  : IMGS.avatarMale}
                style={[tw`h-10 w-10`, { resizeMode: 'contain' }]}
              />
            </View>
          </View>
          <View style={tw`flex-1`}>
            <Text className="font-poppinsBold text-gray text-xs ">Selamat Datang, 👋</Text>
            <View className="flex-row items-center">
              <Text className="font-poppins text-white mr-1 text-xs">{pegawai ? pegawai.nama : 'tunggu ...'}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={props.bellClick}
          >
            <Icon name={'bell-outline'} size={28} color={tw.color('gray-light')} />
            {/* <View style={tw`h-4 w-4 rounded-full absolute bg-negative top-0 right-0`}>
                    <View style={tw`h-4 w-4 justify-center items-center`}>
                        <Text style={tw`text-white text-xs`}>1</Text>
                    </View>
                  </View> */}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  )
}

export default HeaderUser