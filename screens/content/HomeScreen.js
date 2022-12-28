import { View, Text, Image, ScrollView, BackHandler, ImageBackground } from 'react-native'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { IMGS, ROUTES, tw } from '../../constants'
import { AppBtn, AppLoader, GradientTop, HeaderUser } from '../../components'
import { StackActions, useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/AntDesign'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentJadwal, getJadwalsAsync, showError, showJadwals, showLoading } from '../../redux/features/jadwal/jadwalsReducer'
import { getKategoriesAscync } from '../../redux/features/jadwal/kategoryJadwalReducer'
import { LinearGradient } from 'expo-linear-gradient'
import { AuthContext } from '../../context/AuthContext'
import { getAbsenTodayAsync } from '../../redux/features/jadwal/absenReducer'
import { getRekapAsync } from '../../redux/features/jadwal/rekapJadwalReducer'
import AppLoaderAnim from '../../components/~global/AppLoaderAnim'


import dayjs from 'dayjs'
import 'dayjs/locale/id'

const HomeScreen = () => {

  const navigation = useNavigation();

  const dispatch = useDispatch()
  const { pegawai, getMe } = useContext(AuthContext);

  const {jadwals, loading, error} = useSelector(state => state.jadwal)
  const { kategories } = useSelector(state => state.kategory)
  const { hadir, IJIN, SAKIT, CUTI, DL } = useSelector(state => state.rekap)
  
  const [date, setDate] = useState(dayjs().locale("id"))

  const callFirst = () => {
    dispatch(getJadwalsAsync());
    dispatch(getKategoriesAscync());
    dispatch(getAbsenTodayAsync());
    dispatch(getRekapAsync(date.format("MM")))
  }

  const currentJadwal = useSelector((state) => getCurrentJadwal(state, date.format("dddd")))

  const { hari, masuk, pulang, status } = currentJadwal
  
  

  useEffect(() => {
    const subscribe = navigation.addListener("focus", (e) => { 
      // console.log('subscribe:', e)
      callFirst()
      currentJadwal
    })
    // console.log('jadwal dari home effect :', jadwals.length)
    // console.log('kategori dari home effect :', kategories.length)
    console.log('jadwal use selector :', jadwals.length)

    const interval = setInterval(() => {
      setDate(dayjs().locale("id"))
    }, 1000 * 60)
    return () => {
      subscribe
      clearInterval(interval)
    }
    
  }, [navigation])

  
  const componentRekap = (x, txt, icn) => {
    return (
      <View className="w-full border-2 border-gray-light rounded-md p-4">
        <View className="flex-row items-center">
          <Icon name={icn} size={40} color={tw.color('primary')} />
          <View className="ml-3">
            <Text className="font-poppins text-xl -mb-1 text-gray-dark"> {x }</Text>
            <Text className="font-poppins text-gray-dark"> {txt}</Text>
          </View>
        </View>
      </View>
    )
  }

  const renderAbsensiBulanIni = () => {
    return (
      <>
        <Text className="font-poppinsBold" style={tw`px-4 py-2 text-gray-dark`}>Absensi Bulan Ini 📅</Text>
        <View className="bg-white py-4 pb-5 rounded">
          <View className="flex-row items-center justify-between space-x-4 px-4">
            <View className="flex-1 mb-2">
              {componentRekap(hadir.length? hadir.length:0,'Hadir','select1')}
            </View>
            <View className="flex-1 mb-2">
              {componentRekap(SAKIT,'Sakit','disconnect')}
            </View>
          </View>
          <View className="flex-row items-center justify-between space-x-4 px-4">
            <View className="flex-1 mb-2">
              {componentRekap(IJIN,'Izin','paperclip')}
            </View>
            <View className="flex-1 mb-2">
              {componentRekap(CUTI,'Cuti','rest')}
            </View>
          </View>
          {/* <View className="flex-row items-center justify-between space-x-4 px-4">
            <View className="flex-1 mb-2">
              {componentRekap(0,'Hadir','checkbox-multiple-marked-circle-outline')}
            </View>
            <View className="flex-1 mb-2">
              {componentRekap(0,'Hadir','checkbox-multiple-marked-circle-outline')}
            </View>
          </View> */}
        </View>
      </>
    )
  }

  const renderJadwalHariIni = () => {
    return (
      <View style={tw`bg-white p-4 pb-5 rounded`}>
            {status === '2' ? (
              <View className="flex-row items-center space-x-4">
                <View style={tw`flex-1 items-center`}>
                  <View style={tw`rounded-lg p-3 w-full items-center border-gray-light border-2`}>
                    <Text className="font-poppins text-gray-dark" >🕒  {masuk.slice(0, -3)}</Text>
                    <Text className="font-poppins" style={tw`text-primary`}>Waktu Masuk</Text>
                  </View>
                </View>
                <View className="flex-1 items-center">
                  <View style={tw`rounded-lg p-3 w-full items-center border-gray-light border-2`}>
                    <Text className="font-poppins text-gray-dark">🕒  {pulang.slice(0, -3)}</Text>
                    <Text className="font-poppins" style={tw`text-dark`}>Waktu Pulang</Text>
                  </View>
                </View>
              </View>
              
            ): (
              <View className="flex-1 items-center">
                <View style={tw`rounded-lg p-3 w-full items-center border-gray-light border-2`}>
                  <Text className="font-poppins text-gray-dark"> Libur </Text>
                  <Text className="font-poppins" style={tw`text-negative`}>Tidak Ada Jadwal</Text>
                </View>
                </View>
              )
            }
          </View>
    )
  }

  return (
    <View style={tw`flex-1 bg-gray-light`}>
      {/* <ModalPengaturanJadwal visible={config} /> */}
     
      {/* <GradientTop  /> */}
      <HeaderUser bellClick={() => alert(`ini alert percobaan`)} />
      {/* <AppBtn label="MM" clicked={()=> navigation.navigate(ROUTES.SET_JADWAL_AWAL, {jadwals})} /> */}
      <ScrollView>

        {/* JAM DIGITAL */}

        <View className="h-32 w-full overflow-hidden">
          <LinearGradient 
              className="flex-1 justify-center items-center"
              colors={[tw.color('secondary'), tw.color('primary')]}
              start={{ x: 1, y: 0.5 }}
              end={{x:1,y:0.08}}
          >
            <Text className="text-white text-4xl font-poppinsBold">{date.format("HH:mm")}</Text>
            <Text className="text-white font-poppins">{date.format("dddd MMMM YYYY")}</Text>
          </LinearGradient>
        </View>

        <View className="pt-2">
          <Text className="font-poppinsBold" style={tw`px-4 py-2 text-gray-dark`}>Jadwal Hari Ini 📅</Text>
          {renderJadwalHariIni()}
        </View>
        <View className="pt-2">
          {renderAbsensiBulanIni()}
        </View>


        {/* Calendar */}
        <View style={tw`py-2 pb-40`}>
          <Text className="font-poppinsBold" style={tw`px-4 py-2 text-gray-dark`}> Kalender Bulan Ini  🗓️</Text>
          <View style={tw`bg-white p-2 pb-5 rounded`}>
              <Calendar
                monthFormat={'MMMM yyyy'}
                hideExtraDays={true}
                firstDay={1}
                hideDayNames={false}
                disableArrowLeft={true}
                disableArrowRight={true}
              disableAllTouchEventsForDisabledDays={true}
              style={[tw`w-full`]}
              theme={{
                textSectionTitleDisabledColor: tw.color('gray'),
                selectedDayBackgroundColor: tw.color('primary'),
                selectedDayTextColor: tw.color('white'),
              }}
              />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen