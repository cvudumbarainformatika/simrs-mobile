
import React, { useState } from 'react'
import { useEffect } from 'react';
import { View, Text, StatusBar, SafeAreaView, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import { ROUTES, tw } from '../../constants'
import { AppLoader, HeaderUser } from '../../components'
import { useDispatch, useSelector } from 'react-redux';
import { getPegawai } from '../../redux/actions/pegawaiAction';
import { fetchJadwals, fetchKategoryJadwals } from '../../redux/actions/jadwalActions';
import dayjs from 'dayjs'
require('dayjs/locale/id')
  


const JadwalScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  // const { pegawai } = useSelector(state => state.pegawaiReducer)
  const { jadwals, loading } = useSelector(state => state.jadwalReducer)
  
  const [date, setDate] = useState(dayjs().locale('id'))


  useEffect(() => {
    dispatch(fetchJadwals())
    dispatch(fetchKategoryJadwals())
    // console.log('jadwal:', jadwals)
  },[jadwals.length])


  const renderItem = ({ item }) => (
    <TouchableOpacity style={tw`mt-1 bg-white`}
      onPress={() => navigation.navigate(ROUTES.KATEGORY_JADWAL_SCREEN, {jadwal:item})}
    >
      <View style={tw`flex-row items-center justify-between p-4`}>
        <View>
          <Text style={tw`font-bold`}>{ item.hari }</Text>
          {/* {item.status === '2' && (<Text>{item.kategory.nama}</Text>)}
          {item.status !== '2' && (<Text>LIBUR</Text>)} */}
          <Text>{item.kategory?item.kategory.nama: 'LIBUR'}</Text>
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
      <View style={tw`bg-white`}>
        <Text style={tw`self-center font-bold mb-3 pt-4`}>Jadwal Masuk Pegawai </Text>
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