import { View, Text, Image, ScrollView, BackHandler } from 'react-native'
import React, { useContext } from 'react'
import { useState } from 'react'
import { ROUTES, tw } from '../../constants'
import { AppBtn, AppLoader, GradientTop, HeaderUser } from '../../components'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux'
import { fetchJadwals } from '../../redux/actions/jadwalActions'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {

  const navigation = useNavigation();

  const dispatch = useDispatch()
  const { jadwals,loading } = useSelector(state => state.jadwalReducer)

  const [config, setConfig] = useState(true)

  

  useEffect(() => {
    dispatch(fetchJadwals());
    jadwals.length === 0?navigation.navigate(ROUTES.JADWAL_SET_TAB) : null
    console.log('jadwal dari home screen :', jadwals.length)

  }, [dispatch, jadwals.length])
  

  

  return (
    <View style={tw`flex-1 bg-gray-light`}>
      {/* <ModalPengaturanJadwal visible={config} /> */}
      <AppLoader visible={loading} />
      {/* <GradientTop  /> */}
      <HeaderUser bellClick={() => alert(`ini alert percobaan`)}/>
      <ScrollView>
        {/* PRESENSI BULAN INI */}
        {/* <AppBtn label="GG" clicked={()=> navigation.navigate(ROUTES.JADWAL_SET_TAB)} /> */}
        <View style={tw`px-3 pt-2`}>
          <Text style={tw`font-bold pb-1 text-gray-dark`}>Presensi Hari Ini 📅</Text>
          <View style={tw`bg-white p-3 pb-5 rounded`}>
            {/* JIKA BUKAN LIBUR */}
            <View style={tw`flex-row justify-between`}>
              <View style={tw`flex-1 items-center`}>
                <Text style={tw`text-primary`}>Waktu Masuk</Text>
                <View style={tw`rounded-l-lg p-3 w-full items-center bg-primary`}>
                  <Text style={tw`text-white text-[14px] `}>🕒  07:30</Text>
                </View>
              </View>
              <View style={tw`flex-1 items-center`}>
                <Text style={tw`text-dark`}>Waktu Pulang</Text>
                <View style={tw`rounded-r-lg p-3 w-full items-center bg-dark`}>
                  <Text style={tw`text-white text-[14px] `}>🕒  16:00</Text>
                </View>
              </View>
            </View>
            {/* JIKA LIBUR */}
            <View style={tw`flex-1 items-center`}>
              <Text style={tw`text-negative`}>Tidak Ada Jadwal</Text>
              <View style={tw`rounded-lg p-3 w-full items-center bg-negative`}>
                <Text style={tw`text-white text-[14px] `}>🕒  Libur</Text>
              </View>
            </View>
          </View>
        </View>
        {/* PRESENSI HARI INI */}
        <View style={tw`px-3 pt-2`}>
            <Text style={tw`font-bold pb-1 text-gray-dark`}>Statistik Presensi Bulan ini 📈</Text>
          <View style={tw`bg-white p-3 pb-5 rounded`}>
            <View style={tw`flex-row justify-between`}>
              <View style={tw`flex-1 h-24 w-full bg-primary rounded justify-center items-center m-1`}>
                <Text style={tw`text-xs text-gray-light`}>Hadir</Text>
                <Text style={tw`text-[40px] text-white font-bold`}>20</Text>
              </View>
              <View style={tw`flex-1 h-24 w-full bg-negative rounded justify-center items-center m-1`}>
                <Text style={tw`text-xs text-gray-light`}>Tidak Hadir</Text>
                <Text style={tw`text-[40px] text-white font-bold`}>2</Text>
              </View>
             <View style={tw`flex-1 h-24 w-full border-primary border rounded justify-center items-center m-1 p-2`}>
                <Text style={tw`text-xs text-gray text-center`}>Jumlah Hari Masuk seharusnya</Text>
                <Text style={tw`text-[40px] font-bold`}>20</Text>
              </View>
            </View>
          </View>
        </View>
        {/* Calendar */}
        <View style={tw`px-3 pt-3 pb-40`}>
          <Text style={tw`font-bold pb-1 text-gray-dark`}>Absensi Bulan Ini  🗓️</Text>
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