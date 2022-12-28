
import React, { useState } from 'react'
import { useEffect } from 'react';
import { View, Text, StatusBar, SafeAreaView, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import { ROUTES, tw } from '../../constants'
import { AppLoader, HeaderUser } from '../../components'
import { useDispatch, useSelector } from 'react-redux';
import { getJadwalsAsync, setLibur, setMasuk } from '../../redux/features/jadwal/jadwalsReducer';

import dayjs from 'dayjs'
require('dayjs/locale/id')
  


const JadwalScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  // const { pegawai } = useSelector(state => state.pegawaiReducer)
  const { jadwals, waiting, libur, masuk, totalJam} = useSelector(state => state.jadwal)
  const { kategories } = useSelector(state => state.kategory)

  
  const [date, setDate] = useState(dayjs().locale('id'))

  useEffect(() => {
    const updateLib = () => {
      // dispatch(getJadwalsAsync())
      dispatch(setLibur())
      dispatch(setMasuk())
    }

    
    updateLib()

    console.log('total Jam:', totalJam)
    console.log('total libur:', libur)
    console.log('total masuk:', masuk)
    // console.log('jadwal Screen:', jadwals)
  },[libur, masuk])


  const renderItem = ({ item }) => (
    <TouchableOpacity style={tw`mt-1 bg-white`}
      onPress={() => {
        if (item.kategory_id > 2 || item.kategory_id === null) {
          
          navigation.navigate(ROUTES.KATEGORY_JADWAL_SCREEN, {jadwal:item, kategories})
        }
        
      }}
    >
      <View style={tw`flex-row items-center justify-between p-3`}>
        <View>
          <View style={tw`flex-row items-center`}>
            <View style={[tw`w-3 h-3 rounded-3 mr-1`,
              { backgroundColor: item.kategory ? item.kategory.warna : tw.color('negative') }
            ]} />
            <Text className="font-poppinsBold">{ item.hari }</Text>
          </View>
          <Text className="font-poppins text-xs text-center -mt-1" style={{
            borderWidth: 1,
            paddingHorizontal: 5,
            paddingVertical: 4,
            borderColor: item.kategory ? item.kategory.warna : tw.color('negative'),
            borderRadius: 20
          }}>{item.kategory?item.kategory.nama: 'LIBUR'}</Text>
        </View>
        {
          item.kategory ? (
            <View className="items-end">
              <Text className="font-poppins text-gray-dark text-xs">Masuk  : {item.masuk}</Text>
              <Text className="font-poppins text-gray text-xs">Pulang : {item.pulang}</Text>
            </View>
          ) : (
              <View>
                <Text className="font-poppins text-gray text-xs">LIBUR</Text>
              </View>
          )
        }
      </View>
    </TouchableOpacity>
  );




  return (
    <View style={[tw`bg-gray-light flex-1`]}>
      <AppLoader visible={waiting} />
      <HeaderUser />
      <View style={tw`bg-white flex-row justify-between p-2`}>
        <View style={tw`flex-row items-center`}>
          <View style={tw`bg-primary items-center justify-center rounded-2 w-14 h-14`}>
          <Text style={{fontSize:24, color:'white', fontWeight:'bold'}}> {masuk} </Text>
          <Text style={{fontSize:9, color:'white'}}>Masuk</Text>
        </View>
          <View style={tw`bg-negative items-center justify-center rounded-2 ml-2 w-14 h-14`}>
            <Text style={{fontSize:24, color:'white', fontWeight:'bold'}}> {libur} </Text>
              <Text style={{fontSize:9, color:'white'}}>Libur</Text>
          </View>
        </View>

        <View style={tw`bg-dark items-center justify-center rounded-2 ml-2 w-14 h-14`}>
          <Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }}>{totalJam}</Text>
          <Text style={{fontSize:9, color:'white'}}>Total Jam</Text>
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