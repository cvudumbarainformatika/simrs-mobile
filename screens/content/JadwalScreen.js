
import React, { useState } from 'react'
import { useEffect } from 'react';
import { View, Text, StatusBar, SafeAreaView, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import { ROUTES, tw } from '../../constants'
import { AppLoader, HeaderUser } from '../../components'
import { useDispatch, useSelector } from 'react-redux';

import dayjs from 'dayjs'
import { liburJadwalCount} from '../../redux/features/jadwal/jadwalsReducer';
require('dayjs/locale/id')
  


const JadwalScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  // const { pegawai } = useSelector(state => state.pegawaiReducer)
  const { jadwals, loading } = useSelector(state => state.jadwal)
  const { kategories } = useSelector(state => state.kategory)

  const [libur, setLibur] = useState(0);
  const [masuk, setMasuk] = useState(7);

  
  const [date, setDate] = useState(dayjs().locale('id'))


  const updateLibur = () => {
    let lib = jadwals.filter(x => x.status === '1').length
    let mas = masuk - lib
    setLibur(lib)
    setMasuk(mas)
  }

  useEffect(() => {
    updateLibur()
    // console.log('kategory from jadwal:', kategories)
  },[])


  const renderItem = ({ item }) => (
    <TouchableOpacity style={tw`mt-1 bg-white`}
      onPress={() => {
        navigation.navigate(ROUTES.KATEGORY_JADWAL_SCREEN, { jadwal: item, kategories })
      }}
    >
      <View style={tw`flex-row items-center justify-between p-4`}>
        <View>
          <View style={tw`flex-row items-center`}>
            <View style={[tw`w-3 h-3 rounded-3 mr-1`,
              { backgroundColor: item.kategory ? item.kategory.warna : tw.color('negative') }
            ]} />
            <Text style={{
              fontWeight: 'bold',
            }}>{ item.hari }</Text>
          </View>
          <Text style={{
            fontSize:12,
            // color: item.kategory ? item.kategory.warna : '',
            borderWidth: 2,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderColor: item.kategory ? item.kategory.warna : tw.color('negative'),
            borderRadius: 20
          }}>{item.kategory?item.kategory.nama: 'LIBUR'}</Text>
        </View>
        <View>
          <Text style={tw`text-primary text-xs`}>🕒 Masuk: {item.masuk}</Text>
          <Text style={tw`text-negative text-xs`}>🕒 Pulang: {item.pulang}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );




  return (
    <View style={[tw`bg-gray-light flex-1`]}>
      <AppLoader visible={loading} />
      <HeaderUser />
      <View style={tw`bg-white flex-row p-2`}>
        <View style={tw`bg-primary items-center justify-center rounded-2 w-14 h-14`}>
          <Text style={{fontSize:24, color:'white', fontWeight:'bold'}}> {masuk} </Text>
          <Text style={{fontSize:9, color:'white'}}>Masuk</Text>
        </View>
        <View style={tw`bg-negative items-center justify-center rounded-2 ml-2 w-14 h-14`}>
          <Text style={{fontSize:24, color:'white', fontWeight:'bold'}}> {libur} </Text>
          <Text style={{fontSize:9, color:'white'}}>Libur</Text>
        </View>
      </View>
      <FlatList
        data={jadwals}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom:120}}
      />
      {/* <View style={tw`pt-40`} /> */}
        {/* <Text>Keterangan</Text> */}
    </View>
  )
}

export default JadwalScreen



const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});