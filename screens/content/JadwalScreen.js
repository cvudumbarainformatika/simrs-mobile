import { View, Text, StatusBar, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { tw } from '../../constants'
import { HeaderUser } from '../../components'


const DATA = [
  {
    id: 1,
    title: 'Senin',
  },
  {
    id: 2,
    title: 'Selasa',
  },
  {
    id: 3,
    title: 'Rabu',
  },
  {
    id: 4,
    title: 'Kamis',
  },
  {
    id: 5,
    title: 'Jumat',
  },
  {
    id: 6,
    title: 'Sabtu',
  },
  {
    id: 7,
    title: 'Minggu',
  },
];


const Item = ({ title }) => (
  <View style={tw`p-1 mt-1`}>
    <View style={tw`flex-row items-center justify-between p-1 border-b-{1px} border-gray-light`}>
      <View>
        <Text style={tw`font-bold`}>{ title }</Text>
        <Text>{ 'Ini nanti tempat nama shift' }</Text>
      </View>
      <View>
        <Text>Waktu Masuk: 07:00</Text>
        <Text>Waktu Pulang: 16:00</Text>
      </View>
    </View>
  </View>
);

const JadwalScreen = () => {
  const renderItem = ({ item }) => <Item title={item.title} />;
  return (
    <SafeAreaView style={[tw`flex-1 bg-gray-light`]}>
      <HeaderUser />
      <View style={tw`bg-white m-2 p-3 pb-8 rounded-lg`}>
        <Text style={tw`self-center font-bold mb-3`}>Jadwal Masuk Pegawai</Text>
        <View style={tw`border-b-{1px} border-gray`}></View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        {/* <Text>Keterangan</Text> */}
      </View>
    </SafeAreaView>
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