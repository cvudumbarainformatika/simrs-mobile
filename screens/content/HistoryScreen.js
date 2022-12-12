import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { HeaderUser } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { getRekapAsync } from '../../redux/features/jadwal/rekapJadwalReducer'

import dayjs from 'dayjs'
import { tw } from '../../constants'
require('dayjs/locale/id')


const HistoryScreen = ({navigation}) => {

  const dispatch = useDispatch()
  const { rekaps } = useSelector(state => state.rekap)

  const [date, setDate] = useState(dayjs().locale('id'))

  useEffect(() => {

    const subscribe = navigation.addListener("focus", () => {
        dispatch(getRekapAsync(date.format("MM")));
    })

     return () => {
        subscribe
      }
    
  },[navigation, date])

  return (
    <View className="flex-1 bg-gray-light">
      <HeaderUser />
      <View className="p-5 bg-white mb-2">
        <Text className="font-poppinsBold">History Absensi Bulan { date.format("MMMM") }</Text>
      </View>
      {rekaps.length === 0 && (
        <View className="flex-1 justify-center items-center">
          <Icon name="book" color={tw.color('gray')} size={40} />
          <Text className="font-poppins text-gray">History Absensi Belum Ada</Text>
        </View>
      )}
      {rekaps.length > 0 && (
        <ScrollView className="">
          {rekaps.map((item, i) => {
            let cc = item.tanggal
            return (
              <View key={i} className="bg-white px-5 py-2 mb-1">
                <View className="flex-row items-center">
                  <View className="flex-1 flex-row">
                    <Text className="font-poppinsThin text-primary text-[30px]">{item.tanggal.slice(-2)}</Text>
                  </View>
                  <View className="">
                    <Text className="font-poppins">Absen Masuk : { item.masuk }</Text>
                    <Text className="font-poppins">Absen Pulang: { item.pulang === null? '-': item.pulang }</Text>
                  </View>
                </View>
              </View>
            )
          })}
          <View style={{ paddingBottom: 100 }} />
        </ScrollView>
      )}
    </View>
  )
}

export default HistoryScreen