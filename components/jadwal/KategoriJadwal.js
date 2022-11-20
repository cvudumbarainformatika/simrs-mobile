import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { tw } from '../../constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const KategoriJadwal = ({detailKategori, setKategori, selectedKategori}) => {
    const {
        id,nama
  } = detailKategori
  return (
    <TouchableOpacity style={tw`bg-white mt-1 mx-4`} onPress={()=> setKategori(id)}>
          <View style={tw`p-5 flex-row items-center justify-between`}>
        <Text style={tw`${id === selectedKategori? 'font-bold text-secondary': ''}`}>{nama}</Text>
        {id === selectedKategori && (
          <Icon name="check-all" color={tw.color('secondary')} size={22} />
        )}
        </View>
    </TouchableOpacity>
  )
}

export default KategoriJadwal