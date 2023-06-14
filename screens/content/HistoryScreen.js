import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { AppBtn, AppBtnIcon, AppLoader, HeaderUser } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { getRekapAsync, setDate, setNextMonth, setPrevMonth } from '../../redux/features/jadwal/rekapJadwalReducer'
import { tw } from '../../constants'

import dayjs from 'dayjs'
import 'dayjs/locale/id'


function HistoryScreen({ navigation }) {

  const dispatch = useDispatch()
  const { hadir, CUTI, waiting, currentmonth, date } = useSelector(state => state.rekap)
  console.log('rekap', dayjs().daysInMonth())
  // const [date, setDate] = useState(dayjs().month(currentmonth).locale('id'))

  useEffect(() => {
    // console.log('curr', currentmonth)
    const subscribe = navigation.addListener("focus", () => {
      // dispatch(getRekapAsync(date.format("MM")))
      dispatch(setDate())
    })

    return () => {
      subscribe
    }

  }, [navigation])

  useEffect(() => {
    dispatch(getRekapAsync(date.format("MM")))
  }, [date]); // Only re-run the effect if date changes

  function formatter(tgl) {
    return dayjs(tgl).locale("id").format("HH:mm")
  }

  function nextKlik() {
    dispatch(setNextMonth())
    // dispatch(getRekapAsync(date.format("MM")));
  }

  function prevClick() {
    dispatch(setPrevMonth())
    // dispatch(getRekapAsync(date.format("MM")));
  }

  const viewHistory = (hdr) => {
    return (
      <ScrollView className="">
        {hadir.map((item, i) => {
          let cc = item.tanggal
          return (
            <View key={i} className="bg-white px-5 py-2 mb-1">
              <View className="flex-row items-center">
                <View className="flex-1 flex-row">
                  <Text className="font-poppinsThin text-primary text-2xl">{item.tanggal.slice(-2)} </Text>
                  <Text className="font-poppins text-primary ">{dayjs(item.tanggal + ' 07:00').locale("id").format("dddd")} </Text>
                </View>
                <View className="">
                  <Text className="font-poppins text-xs text-right">AM : {item.masuk ? formatter(item.created_at) : ' - '}</Text>
                  <Text className="font-poppins text-xs text-right">AP : {item.pulang ? formatter(item.updated_at) : ' - '}</Text>
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
        <Text className="font-poppins text-gray  text-xs mt-5">History Absensi Bulan {date.format("MMMM")} Belum Ada</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-gray-light">
      <HeaderUser />
      <AppLoader visible={waiting} />
      <View className="flex-row items-center px-4 py-3 bg-white mb-2">
        <View className="flex-1">
          <Text className="font-poppins ">History Absensi Bulan {date.format("MMMM")}</Text>
          <Text className="font-poppins text-xs text-gray">Waktu Absensi Menggunakan Waktu Server</Text>
        </View>
        <View className="">
          <View className="flex-row items-center">
            <AppBtnIcon icon="chevron-left" color="primary" colorIcon="white" rounded clicked={() => prevClick()} />
            <View className="ml-1">
              <AppBtnIcon icon="chevron-right" color="dark" colorIcon="white" rounded clicked={() => nextKlik()} />
            </View>
          </View>
        </View>
      </View>

      {hadir.length > 0 ? viewHistory(hadir) : emptyHistory()}
    </View>
  )
}

export default HistoryScreen