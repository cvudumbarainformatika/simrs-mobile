import { View, Text } from 'react-native'
import React from 'react'
import { tw } from '../../constants'
import { GradientTop, HeaderUser } from '../../components'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const HomeScreen = () => {
  return (
    <View style={tw`flex-1 bg-gray-light`}>
      <GradientTop  />
      <HeaderUser bellClick={() => alert(`ini alert percobaan`)}/>
      <ScrollView>
          {/* PRESENSI BULAN INI */}
        <View style={tw`px-2 pt-2`}>
          <View style={tw`bg-white p-2 pb-5 rounded`}>
            <Text style={tw`font-bold pb-2 text-gray-dark`}>Presensi Hari Ini</Text>
            <View style={tw`flex-row justify-between`}>
              <View style={tw`flex-1 items-center`}>
                <Text style={tw`text-primary font-bold`}>Waktu Masuk</Text>
                <View style={tw`border-2 border-secondary rounded-lg p-2`}>
                  <Text style={tw`text-secondary text-[50px] `}>07:30</Text>
                </View>
              </View>
              <View style={tw`flex-1 items-center`}>
                <Text style={tw`text-negative font-bold`}>Waktu Pulang</Text>
                <View style={tw`border-2 border-negative rounded-lg p-2`}>
                  <Text style={tw`text-negative text-[50px] `}>16:00</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* PRESENSI HARI INI */}
        <View style={tw`px-2 pt-2`}>
          <View style={tw`bg-white p-2 pb-5 rounded`}>
            <Text style={tw`font-bold pb-2 text-gray-dark`}>Statistik Presensi Bulan ini</Text>
            <View style={tw`flex-row justify-between`}>
              <View style={tw`flex-1 h-24 w-full bg-primary rounded justify-center items-center m-1`}>
                <Text style={tw`text-xs text-gray-light`}>Hadir</Text>
                <Text style={tw`text-xl text-white font-bold`}>20</Text>
              </View>
              <View style={tw`flex-1 h-24 w-full bg-negative rounded justify-center items-center m-1`}>
                <Text style={tw`text-xs text-gray-light`}>Tidak Hadir</Text>
                <Text style={tw`text-xl text-white font-bold`}>20</Text>
              </View>
             <View style={tw`flex-1 h-24 w-full border-primary border rounded justify-center items-center m-1 p-2`}>
                <Text style={tw`text-xs text-gray text-center`}>Jumlah Hari Masuk seharusnya</Text>
                <Text style={tw`text-xl font-bold`}>20</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen