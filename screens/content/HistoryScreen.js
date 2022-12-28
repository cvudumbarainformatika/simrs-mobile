import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { HeaderUser } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { getRekapAsync } from '../../redux/features/jadwal/rekapJadwalReducer'

import dayjs from 'dayjs'
import { tw } from '../../constants'
require('dayjs/locale/id')


const HistoryScreen = ({navigation}) => {

  const dispatch = useDispatch()
  const { hadir } = useSelector(state => state.rekap)
  console.log('rekap', hadir)

  const [date, setDate] = useState(dayjs().locale('id'))

  useEffect(() => {

    const subscribe = navigation.addListener("focus", () => {
        dispatch(getRekapAsync(date.format("MM")));
    })

     return () => {
        subscribe
      }
    
  }, [navigation, date])
  
  const viewHistory = () => {
    return (
      <ScrollView className="">
          {hadir.map((item, i) => {
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
    )
  }

  const emptyHistory = () => {
    return (
      <View className="flex-1 justify-center items-center p-4">
          <Icon name="filetext1" color={tw.color('gray')} size={60} />
          <Text className="font-poppins text-gray  text-xs mt-5">History Absensi Bulan { date.format("MMMM") } Belum Ada</Text>
        </View>
    )
  }

  return (
    <View className="flex-1 bg-gray-light">
      <HeaderUser />
      <View className="p-5 bg-white mb-2">
        <Text className="font-poppins">History Absensi Bulan { date.format("MMMM") }</Text>
      </View>
      {hadir.length > 0? viewHistory(): emptyHistory()}
      {/* {rekaps.length > 0 && (
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
      )} */}
    </View>
  )
}

export default HistoryScreen