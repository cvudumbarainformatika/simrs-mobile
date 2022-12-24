import { View, Text, Image, ScrollView, BackHandler, ImageBackground } from 'react-native'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { IMGS, ROUTES, tw } from '../../constants'
import { AppBtn, AppLoader, GradientTop, HeaderUser } from '../../components'
import { StackActions, useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentJadwal, getJadwalsAsync, showError, showJadwals, showLoading } from '../../redux/features/jadwal/jadwalsReducer'
import { getKategoriesAscync } from '../../redux/features/jadwal/kategoryJadwalReducer'
import { LinearGradient } from 'expo-linear-gradient'
import { AuthContext } from '../../context/AuthContext'
import AppLoaderAnim from '../../components/~global/AppLoaderAnim'


import dayjs from 'dayjs'
import { getAbsenTodayAsync } from '../../redux/features/jadwal/absenReducer'
require('dayjs/locale/id')

const HomeScreen = () => {

  const navigation = useNavigation();

  const dispatch = useDispatch()
  const { pegawai, getMe } = useContext(AuthContext);

  const {jadwals, loading, error} = useSelector(state => state.jadwal)
  const { kategories } = useSelector(state => state.kategory)
  
  const [date, setDate] = useState(dayjs().locale("id"))

  const callFirst = () => {
    dispatch(getJadwalsAsync());
    dispatch(getKategoriesAscync());
    dispatch(getAbsenTodayAsync());
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

  // if (loading) {
  //   return (
  //      <AppLoader visible={loading} />
  //   )
  // }

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

        <View style={tw`pt-2`}>
          <Text className="font-poppinsBold" style={tw`px-4 py-2 text-gray-dark`}>Jadwal Hari Ini 📅</Text>
          <View style={tw`bg-white p-4 pb-5 rounded`}>
            {/* JIKA BUKAN LIBUR */}
            {status === '2' ? (
              <View style={tw`flex-row justify-between `}>
                <View style={tw`flex-1 items-center`}>
                  <Text style={tw`text-primary`}>Waktu Masuk</Text>
                  <View style={tw`rounded-l-lg p-3 w-full items-center bg-primary`}>
                    <Text className="font-poppins" style={tw`text-white text-[14px] `}>🕒  {masuk.slice(0, -3)}</Text>
                  </View>
                </View>
                <View style={tw`flex-1 items-center`}>
                  <Text style={tw`text-dark`}>Waktu Pulang</Text>
                  <View style={tw`rounded-r-lg p-3 w-full items-center bg-dark`}>
                    <Text className="font-poppins"  style={tw`text-white text-[14px] `}>🕒  {pulang.slice(0, -3)}</Text>
                  </View>
                </View>
              </View>
            ): (
              <View style={tw`flex-1 items-center`}>
                <Text className="font-poppins" style={tw`text-negative`}>Tidak Ada Jadwal</Text>
                <View style={tw`rounded-lg p-3 w-full items-center bg-negative`}>
                  <Text className="font-poppins" style={tw`text-white text-[14px] `}> Libur </Text>
                </View>
                </View>
              )
            }

          </View>
        </View>
        {/* PRESENSI HARI INI */}
        {/* <View style={tw`pt-2`}>
            <Text className="font-poppinsBold" style={tw`px-4 py-2 text-gray-dark`}>Statistik Presensi Bulan ini 📈</Text>
          <View style={tw`bg-white p-3 pb-5 rounded`}>
            <View style={tw`flex-row justify-between`}>
              <View style={tw`flex-1 h-24 w-full bg-primary rounded justify-center items-center m-1`}>
                <Text className="font-poppins" style={tw`text-xs text-gray-light`}>Hadir</Text>
                <Text className="font-poppinsBold" style={tw`text-[40px] text-white`}>20</Text>
              </View>
              <View style={tw`flex-1 h-24 w-full bg-negative rounded justify-center items-center m-1`}>
                <Text className="font-poppins" style={tw`text-xs text-gray-light`}>Tidak Hadir</Text>
                <Text className="font-poppinsBold" style={tw`text-[40px] text-white`}>2</Text>
              </View>
             <View style={tw`flex-1 h-24 w-full border-primary border rounded justify-center items-center m-1 p-2`}>
                <Text className="font-poppins" style={tw`text-xs text-gray text-center`}>Seharusnya</Text>
                <Text className="font-poppinsBold" style={tw`text-[40px]`}>20</Text>
              </View>
            </View>
          </View>
        </View> */}
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