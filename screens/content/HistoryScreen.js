import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { HeaderUser } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { getRekapAsync } from '../../redux/features/jadwal/rekapJadwalReducer'
import { tw } from '../../constants'

import dayjs from 'dayjs'
import 'dayjs/locale/id'


const HistoryScreen = ({navigation}) => {

  const dispatch = useDispatch()
  const { hadir, CUTI } = useSelector(state => state.rekap)
  // console.log('rekap', CUTI)

  const [date, setDate] = useState(dayjs().locale('id'))

  useEffect(() => {

    const subscribe = navigation.addListener("focus", () => {
        dispatch(getRekapAsync(date.format("MM")));
    })

     return () => {
        subscribe
      }
    
  }, [navigation, date])

  function formatter(tgl) {
    return dayjs(tgl).locale("id").format("HH:mm")
  }
  
  const viewHistory = () => {
    return (
      <ScrollView className="">
          {hadir.map((item, i) => {
            let cc = item.tanggal
            return (
              <View key={i} className="bg-white px-5 py-2 mb-1">
                <View className="flex-row items-center">
                  <View className="flex-1 flex-row">
                    <Text className="font-poppinsThin text-primary text-2xl">{item.tanggal.slice(-2)} </Text>
                    <Text className="font-poppins text-primary ">{ dayjs(item.tanggal +' 07:00').locale("id").format("dddd") } </Text>
                  </View>
                  <View className="">
                    <Text className="font-poppins text-xs text-right">AM : { item.masuk ? formatter(item.created_at) : ' - ' }</Text>
                    <Text className="font-poppins text-xs text-right">AP : { item.pulang ? formatter(item.updated_at) : ' - '}</Text>
                  </View>
                </View>
              </View>
            )
          })}
          <View style={{ paddingBottom: 300 }} />
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
      <View className="px-4 py-3 bg-white mb-2">
        <Text className="font-poppins">History Absensi Bulan { date.format("MMMM") }</Text>
        <Text className="font-poppins text-xs text-gray">Waktu Absensi Menggunakan Waktu Server</Text>
      </View>
      {hadir.length > 0? viewHistory(): emptyHistory()}
    </View>
  )
}

export default HistoryScreen