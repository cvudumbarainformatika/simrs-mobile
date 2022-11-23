import { View, Text, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { IMGS, ROUTES, tw } from '../../constants'
import { AppBtn } from '../../components'
import { AuthContext } from '../../context/AuthContext'
import { PATH_IMG100 } from '../../config'
import { ScrollView } from 'react-native-gesture-handler'
// import { AuthContext } from '../../context/AuthContext'

const SettingsScreen = ({ navigation }) => {
  // const { logout } = useContext(AuthContext);
  const { pegawai } = useContext(AuthContext)
  const [sheet, setSheet] = useState(false)


  useEffect(() => {
    console.log(pegawai)
  },[])
  return (
    <View style={tw`flex-1`}>
      <Image 
          source={ pegawai? {uri:`${PATH_IMG100}/${pegawai.nip}/${pegawai.foto}`} : IMGS.avatarMale}
          style={[tw`h-120 w-full`, {resizeMode:'cover'}]}
      />

      <View style={[tw`absolute bottom-0 left-0 right-0 top-0 bg-gray-light rounded-t-4`, {
        marginTop:360, overflow:'hidden'
      }]}>
        <View style={tw`p-4 border-b-2 border-gray-light bg-white`}>
          <Text style={tw`font-bold`}>Profile Details 👋</Text>
        </View>
        <ScrollView>
          <View style={tw`bg-white p-4 mt-[1]`}>
            <Text style={tw`text-xs text-gray`}>🧑 Nama</Text>
            <Text style={tw``}>{ pegawai.nama }</Text>
          </View>
          <View style={tw`bg-white p-4 mt-[2]`}>
            <Text style={tw`text-xs text-gray`}>💼 Nip</Text>
            <Text style={tw``}>{pegawai.nip}</Text>
          </View>
          <View style={tw`bg-white p-4 mt-[2]`}>
            <Text style={tw`text-xs text-gray`}>🏷️ Nik</Text>
            <Text style={tw``}>{ pegawai.nik }</Text>
          </View>
          <View style={tw`bg-white p-4 mt-[2]`}>
            <Text style={tw`text-xs text-gray`}>🏠 Alamat</Text>
            <Text style={tw``}>{ pegawai.alamat_detil }</Text>
          </View>
          <View style={tw`bg-white p-4 mt-[1]`}>
            <Text style={tw`text-xs text-gray`}>📞 Telp</Text>
            <Text style={tw``}>{ pegawai.telp }</Text>
          </View>
          <View style={tw`bg-white p-4 mt-[1]`}>
            <Text style={tw`text-xs text-gray`}>Alamat</Text>
            <Text style={tw``}>{ pegawai.alamat_detil }</Text>
          </View>
          <View style={tw`bg-white p-4 mt-[1]`}>
            <Text style={tw`text-xs text-gray`}>Alamat</Text>
            <Text style={tw``}>{ pegawai.alamat_detil }</Text>
          </View>
          <View style={tw`bg-white p-4 mt-[1]`}>
            <Text style={tw`text-xs text-gray`}>Alamat</Text>
            <Text style={tw``}>{ pegawai.alamat_detil }</Text>
          </View>
          <View style={{paddingBottom:120}} />
        </ScrollView>
      </View>
    </View>
  )
}

export default SettingsScreen