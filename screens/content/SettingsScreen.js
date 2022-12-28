import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { IMGS, ROUTES, tw } from '../../constants'
import { AppBtn, BottomTwoBtn } from '../../components'
import { AuthContext } from '../../context/AuthContext'
import { PATH_IMG100 } from '../../config'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import { AuthContext } from '../../context/AuthContext'

const SettingsScreen = ({ navigation }) => {
  // const { logout } = useContext(AuthContext);
  const { pegawai } = useContext(AuthContext)

  const {nip, nip_baru} = pegawai
  const [sheet, setSheet] = useState(false)

  let nipB = "-"
  if (nip_baru === "" || nip_baru === null) {
    nipB = nip
  } else {
    nipB = nip_baru
  }
  
   

  console.log('nip', nipB)

  useEffect(() => {
    // console.log(pegawai)
  },[])
  return (
    <View style={tw`flex-1`}>
      <Image 
          source={pegawai
                          ? pegawai.foto === '' || pegawai.foto === null
                            ? IMGS.avatarMale :{uri:`${PATH_IMG100}/${pegawai.nip}/${pegawai.foto}`}
                          : IMGS.avatarMale}
          style={[tw`h-100 w-full bg-gray`, {resizeMode:'contain'}]}
      />

      <View style={tw`absolute top-0 p-4 mt-10`}>
        <AppBtn icon="chevron-left" color="dark" round clicked={ ()=> navigation.goBack() } />
      </View>

      <View style={[tw`absolute bottom-0 left-0 right-0 top-0 bg-gray-light rounded-t-4`, {
        marginTop:300, overflow:'hidden'
      }]}>
        <View style={tw`p-4 border-b-2 border-gray-light bg-white`}>
          <Text className="font-poppinsBold">Profile Details 👋</Text>
        </View>
        <ScrollView>

          <View style={tw`bg-white p-3 mt-[1]`}>
            <Text className="font-poppins text-gray text-xs">🧑 Nama</Text>
            <Text className="font-poppins ">{ pegawai.nama }</Text>
          </View>
          <View style={tw`bg-white p-3 mt-[2]`}>
            <Text className="font-poppins text-gray text-xs">💼 Nip</Text>
            <Text className="font-poppins ">{nipB}</Text>
          </View>
          <View style={tw`bg-white p-3 mt-[2]`}>
            <Text className="font-poppins text-gray text-xs">🏷️ Nik</Text>
            <Text className="font-poppins">{ pegawai.nik }</Text>
          </View>
          <View style={tw`bg-white p-3 mt-[2]`}>
            <Text className="font-poppins text-gray text-xs">🏠 Alamat</Text>
            <Text className="font-poppins">{ pegawai.alamat_detil }</Text>
          </View>
          <View style={tw`bg-white p-3 mt-[1]`}>
            <Text className="font-poppins text-gray text-xs">📞 Telp</Text>
            <Text className="font-poppins">{ pegawai.telp }</Text>
          </View>
          <TouchableOpacity
            onPress={()=> navigation.navigate(ROUTES.SETTINGS_DETAIL, pegawai)}
            className="bg-primary h-14 justify-center items-end">
            <View className="mr-4 flex-row items-center">
              <Text className="text-white font-poppins">Ganti Password</Text>
              <Icon name="chevron-right" color={'white'} size={ 32 } />
            </View>
          </TouchableOpacity>



          <View style={{paddingBottom:120}} />
        </ScrollView>
        <View className="absolute bottom-0 w-full">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity style={tw`h-14 w-1/2 bg-negative justify-center items-center`}
            onPress={()=> navigation.navigate(ROUTES.LOGOUT, {expired:true})}
          >
              <Text className="font-poppins text-white">Logout</Text>
          </TouchableOpacity>
            <TouchableOpacity style={tw`h-14 w-1/2 bg-dark justify-center items-center`}
            onPress={()=> navigation.goBack()}
          >
              <Text className="font-poppins text-white">Kembali</Text>
          </TouchableOpacity>
          
          </View>
        </View>
      </View>
    </View>
  )
}

export default SettingsScreen