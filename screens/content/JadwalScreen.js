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
  <View style={tw`bg-white mx-2 mt-2`}>
    <View style={tw`flex-row justify-between items-center`}>
      <View style={tw`bg-primary p-2 rounded-l w-25 h-full`}>
        <Text style={tw`text-white font-bold`}>{title}</Text>
      </View>
      <View style={tw`p-3 rounded-r flex-1`}>
        <View style={tw`flex-col items-end`}>
          <Text>Jam Masuk</Text>
          <Text>Jam Pulang</Text>
        </View>
      </View>
    </View>
  </View>
);

const JadwalScreen = () => {
  const renderItem = ({ item }) => <Item title={item.title} />;
  return (
    <SafeAreaView style={[tw`flex-1 bg-gray-light`]}>
      <HeaderUser />
      <View>
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