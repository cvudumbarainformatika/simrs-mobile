import { View, Text, Image, ScrollView, BackHandler, ImageBackground } from 'react-native'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { IMGS, ROUTES, tw } from '../../constants'
import { AppBtn, AppLoader, GradientTop, HeaderUser } from '../../components'
import { StackActions, useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentJadwal, getJadwalsAsync, showError, showJadwals, showLoading } from '../../redux/features/jadwal/jadwalsReducer'
import { getKategoriesAscync } from '../../redux/features/jadwal/kategoryJadwalReducer'
import { LinearGradient } from 'expo-linear-gradient'
import { AuthContext } from '../../context/AuthContext'
import { getAbsenTodayAsync } from '../../redux/features/jadwal/absenReducer'
import { getRekapAsync, setDate } from '../../redux/features/jadwal/rekapjadwalv2Reducer'
// import AppLoaderAnim from '../../components/~global/AppLoaderAnim
import * as Notifications from 'expo-notifications';


import dayjs from 'dayjs'
import 'dayjs/locale/id'
import AllMenu from '../home/comp/AllMenu'

const HomeScreenV2 = () => {

    const navigation = useNavigation();

    const dispatch = useDispatch()
    const { pegawai, getMe } = useContext(AuthContext);

    const { jadwals, loading, error } = useSelector(state => state.jadwal)
    const { kategories } = useSelector(state => state.kategory)
    const { CUTI, IJIN, SAKIT, DL, DISPEN, A, TERLAMBAT, HADIR } = useSelector(state => state.rekapv2)

    const [date, setDatex] = useState(dayjs().locale("id"))

    const callFirst = () => {
        // getMe()
        dispatch(setDate())
        dispatch(getJadwalsAsync());
        dispatch(getKategoriesAscync());
        dispatch(getAbsenTodayAsync());
        dispatch(getRekapAsync(dayjs().locale('id').format("MM")))
    }

    const currentJadwal = useSelector((state) => getCurrentJadwal(state, date.format("dddd")))

    const { hari, masuk, pulang, status } = currentJadwal


    useEffect(() => {
        if (pegawai === null || !pegawai) {
            navigation.navigate(ROUTES.LOGOUT)
        }
        const subscribe = navigation.addListener("focus", (e) => {
            callFirst()
            currentJadwal
            console.log('date :', date)
        })

        const interval = setInterval(() => {
            setDatex(dayjs().locale("id"))
        }, 1000 * 60)


        return () => {
            subscribe
            clearInterval(interval)
        }

    }, [navigation])

    // const handleNotificationMasuk = async () => {
    //     await Notifications.scheduleNotificationAsync({
    //         content: {
    //             title: "Absen Masuk! 🔔",
    //             body: 'Anda Sudah Bisa Absen Masuk',
    //             data: { data: 'Absensi Masuk' },
    //         },
    //         trigger: {
    //             seconds: 1,
    //             channelId: 'absensi',
    //         },
    //     });

    //     return handleNotificationMasuk
    // }

    function clickedMenu(val) {
        console.log('menu ok', val)
        if (val.route) {
            navigation.dispatch(StackActions.push(val.route))
        } else {
            alert(`Aplikasi ${val.name} akan Release pada Update an selanjutnya`)
        }

        // if (val.id > 1) {
        //     alert(`Aplikasi ${val.name} akan Release pada Update an selanjutnya`)
        // }
    }


    const componentRekap = (x, txt, icn) => {
        return (
            <View className="w-full border-2 border-gray-light rounded-md p-4">
                <View className="flex-row items-center">
                    <View className="flex-1">
                        <Icon name={icn} size={25} color={tw.color('primary')} />
                    </View>
                    <View className="ml-1">
                        <Text className="font-poppinsBold text-xl -mb-1 text-gray-dark text-right"> {x}</Text>
                        <Text className="font-poppins text-xs text-gray-dark text-right"> {txt}</Text>
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
                    <View className="flex-row items-center justify-between space-x-2 px-4">
                        <View className="flex-1 mb-2">
                            {componentRekap(HADIR, 'Hadir', 'select1')}
                        </View>
                        <View className="flex-1 mb-2">
                            {componentRekap(SAKIT, 'Sakit', 'medicinebox')}
                        </View>
                        <View className="flex-1 mb-2">
                            {componentRekap(IJIN, 'Izin', 'paperclip')}
                        </View>
                    </View>
                    <View className="flex-row items-center justify-between space-x-2 px-4">
                        <View className="flex-1 mb-2">
                            {componentRekap(CUTI, 'Cuti', 'rest')}
                        </View>
                        <View className="flex-1 mb-2">
                            {componentRekap(DL, 'DL', 'rocket1')}
                        </View>
                        <View className="flex-1 mb-2">
                            {componentRekap(DISPEN, 'Dispen', 'retweet')}
                        </View>
                    </View>
                    <View className="flex-row items-center justify-between space-x-2 px-4">
                        <View className="flex-1 mb-2">
                            {componentRekap(A, 'Alpha', 'disconnect')}
                        </View>
                        <View className="flex-grow mb-2">
                            {componentRekap(TERLAMBAT, 'Terlambat', 'exception1')}
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
                    <>
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
                    </>
                ) : (
                    <>
                        <View className="flex-1 items-center justify-center">
                            <View style={tw`rounded-lg p-3 w-full items-center border-gray-light border-2`}>
                                <Text className="font-poppins text-gray-dark"> Libur </Text>
                                <Text className="font-poppins" style={tw`text-negative`}>Tidak Ada Jadwal</Text>
                            </View>
                        </View>
                    </>
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

                <View className="h-24 w-full overflow-hidden">
                    <LinearGradient
                        className="flex-1 justify-center items-center"
                        colors={[tw.color('secondary'), tw.color('primary')]}
                        start={{ x: 1, y: 0.8 }}
                        end={{ x: 1, y: 0.08 }}
                    >
                        <Text className="text-white text-4xl font-poppinsBold">{date.format("HH:mm")}</Text>
                        <Text className="text-white font-poppins">{date.format("dddd MMMM YYYY")}</Text>
                    </LinearGradient>
                </View>

                {/* KUMPULAN MENU */}
                <View className="pt-2 w-full">
                    <Text className="font-poppinsBold" style={tw`px-4 py-2 text-gray-dark`}>Aplikasi 📇</Text>
                    <AllMenu clicked={(val) => clickedMenu(val)} />
                </View>


                {/* JADWAL HARINI */}
                <View className="pt-2">
                    <Text className="font-poppinsBold" style={tw`px-4 py-2 text-gray-dark`}>Jadwal Hari Ini 📅</Text>
                    {renderJadwalHariIni()}
                </View>

                {/* Absensi Bulan Ini */}
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

export default HomeScreenV2