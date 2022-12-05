import { View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { AppBtn, AppLoader } from '../../components'
import { useNavigation } from '@react-navigation/native'
import { ROUTES, tw } from '../../constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


import { useState } from 'react'
import { getCurrentJadwal, getJadwalsAsync } from '../../redux/features/jadwal/jadwalsReducer'
import { getKategoriesAscync } from '../../redux/features/jadwal/kategoryJadwalReducer'
import { getAbsenTodayAsync, setIsAbsen, stateAbsenToday, stateAbsenTodayMasuk } from '../../redux/features/jadwal/absenReducer'

import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Notifications from 'expo-notifications';

import dayjs from 'dayjs'
require('dayjs/locale/id')

const ScreenAbsenAwal = ({ navigation }) => {
    

//    console.log(route.params)

    // jadwal harii ini
    const dispatch = useDispatch()
    const [date, setDate] = useState(dayjs().locale("id"))

    const currentJadwal = useSelector((state) => getCurrentJadwal(state, date.format("dddd")))
    const { hari, masuk, pulang, status, kategory_id } = currentJadwal
    const { id, interv, absenToday, waiting, isDone, isAbsen, absenTodayMasuk, absenTodayPulang } = useSelector(state => state.absen)

    const [absenMasuk, setAbsenMasuk] = useState(false)
    const [absenPulang, setAbsenPulang] = useState(false)
    const [statusAbsen, setStatusAbsen] = useState("WAM")
    
    // console.log(absenTodayPulang)

    let bukaAbsenMasuk = date.format("HH:mm") >= kurangiJam(masuk, 1) && date.format("HH:mm") <= kurangiMenit(pulang, 30)
    let bukaAbsenPulang = date.format("HH:mm") >= kurangiMenit(pulang, 30) && date.format("HH:mm") <= tambahiJam(pulang, 5)

    if (pulang >= "21:00:00") {
        bukaAbsenPulang = date.format("HH:mm") >= "23:55"
    }
    
    const configAbsen = () => {
        let sta = "WAM"

        if (bukaAbsenMasuk && absenTodayMasuk === null) {
            // dispatch(setIsAbsen(false))
            setAbsenMasuk(true)
            setAbsenPulang(false)
            sta = "WAM" // waktu absen masuk
            setStatusAbsen("WAM")
            handleNotification()
        } else if (bukaAbsenMasuk && absenTodayMasuk !== null) {
            // dispatch(setIsAbsen(true))
            setAbsenMasuk(false)
            setAbsenPulang(false)
            sta = "SAM" // sudah absen masuk
            setStatusAbsen("SAM")
        } else if (bukaAbsenPulang && absenTodayPulang === null) {
            // dispatch(setIsAbsen(false))
            setAbsenMasuk(false)
            setAbsenPulang(true)
            sta = "WAP" // waktu absen pulang
            setStatusAbsen("WAP")
        } else if (bukaAbsenPulang && absenTodayPulang !== null) {
            // dispatch(setIsAbsen(true))
            setAbsenMasuk(false)
            setAbsenPulang(false)
            sta = "SAP" // sudah absen pulang
            setStatusAbsen("SAP")
        } else if (!bukaAbsenMasuk && !bukaAbsenPulang) {
            // dispatch(setIsAbsen(false))
            setAbsenMasuk(false)
            setAbsenPulang(false)
            sta = "DA" // done all
            setStatusAbsen("DA")
        }

    }

     // locaion -7.745561337439556, 113.2106703321762
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const lokasiKantor = {
        latitude: -7.745484285962737,
        longitude: 113.21066274574322
    }
    // const lokasi kantor -7.745484285962737, 113.21066274574322
    const getLocation = async() => {
         let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    }

    let text = 'Waiting..';
    if (errorMsg) {
        // text = errorMsg;
        text = 'KAMU MEMATIKAN LOKASI';
    } else if (location) {
        // text = JSON.stringify(location);   
        // console.log(location)
        let jarakKamuDariKantor = hitungJarak(location.coords, lokasiKantor)
        // console.log(jarak)
        if (jarakKamuDariKantor > 300) {
            text = 'KAMU JAUH DARI AREA KANTOR';
        } else {
            text = 'KAMU DIAREA KANTOR';
        }
    }

    
    

    useEffect(() => {
        
        
        const subscribe = navigation.addListener("focus", () => {
            dispatch(getAbsenTodayAsync());
            configAbsen()
            console.log('absens Today :', statusAbsen)
        })

        

        const interval = setInterval(() => {
            setDate(dayjs().locale("id"))
        }, 1000)
        // getLocation()
        return () => {
            subscribe
            clearInterval(interval)
        }
    }, [navigation, statusAbsen ])

  return (
      <SafeAreaView className="flex-1 justify-center items-center">
          <AppLoader visible={waiting} />
         <TouchableOpacity className="absolute top-8 right-4" onPress={()=> navigation.navigate(ROUTES.HOME_TAB)}>
            <Icon name="close" color="black" size={32} />
          </TouchableOpacity> 

          <View className="absolute top-20 items-center">
              <Icon name="lock" color={tw.color('gray')} size={24} />
            <Text className="text-gray text-3xl pt-2 font-poppins">{date.format("HH:mm:ss")}</Text>
        </View>

          {/* CONTENT */}
          {/* {isAbsen ? (
             <View className="self-center justify-center items-center">
                  <Icon name="check-decagram" color={tw.color("primary")} size={80} />
              <Text className={`pt-1 text-primary`}>Absen Success</Text>
            </View> 
          ): ( */}
          {status === '2' && (<>
              {
                //   (absenMasuk && absenTodayMasuk === null) && (
                  (statusAbsen === "WAM") && (
                      <>
                        <View className="self-center justify-center items-center">
                            <Icon name="bell-ring" color={tw.color("primary")} size={80} />
                            <Text className={`pt-1 text-primary font-poppins`}>Absen Masuk</Text>
                        </View>
                          <TouchableOpacity
                            className="w-18 h-18 bg-dark overflow-hidden absolute bottom-8 rounded-full"
                            onPress={() => navigation.navigate(ROUTES.QR_SCAN, { kategory_id })}
                            >
                        <View className="justify-center items-center self-center h-18 p-4">
                            <Icon name="qrcode-scan" color={'white'} size={32} />
                        </View>
                        </TouchableOpacity>
                    </>
                  )
              }
              {
                //   (absenMasuk && absenTodayMasuk !== null) && (
                  (statusAbsen === "SAM") && (
                      <View className="self-center justify-center items-center">
                        <Icon name="check-decagram" color={tw.color("primary")} size={80} />
                        <Text className={`pt-1 text-primary font-poppins`}>Sudah Absen Masuk</Text>
                      </View>)
              }
              {
                //   (absenPulang && absenTodayPulang === null) && (
                  (statusAbsen === "WAP") && (
                    <>
                        <View className="self-center justify-center items-center">
                            <Icon name="bell-ring" color={tw.color("negative")} size={80} />
                            <Text className={`pt-1 text-negative font-poppins`}>Absen Pulang</Text>
                      </View>
                      <TouchableOpacity
                                className="w-18 h-18 bg-dark overflow-hidden absolute bottom-8 rounded-full"
                                onPress={() => navigation.navigate(ROUTES.QR_SCAN, { kategory_id })}
                            >
                        <View className="justify-center items-center self-center h-18 p-4">
                            <Icon name="qrcode-scan" color={'white'} size={32} />
                        </View>
                        </TouchableOpacity>
                    </>
              )}
              {
                //   (absenPulang && absenTodayPulang !== null) && (
                  (statusAbsen === "SAP") && (
                      <View className="self-center justify-center items-center">
                        <Icon name="check-decagram" color={tw.color("primary")} size={80} />
                        <Text className={`pt-1 text-primary font-poppins`}>Telah Absen Pulang</Text>
                      </View>)
              }
              {
                //   (!absenMasuk && !absenPulang) && (
                  (statusAbsen === "DA") && (
                  <View className="self-center justify-center items-center">
                      <Icon name="calendar-clock" color={tw.color("gray")} size={80} />
                      <Text className={`pt-1 text-gray font-poppins`}>Selamat beristirahat</Text>
                  </View>
                  )
              }
          </>)}   
            
          {/* <View className="self-center justify-center items-center">
            <Text className="pt-1 text-negative">Text Untuk Geo</Text>
        </View>    */}
          {status === '1' &&(<View className="self-center justify-center items-center">
              <Icon name="calendar" color={tw.color("negative")} size={80} />
              <Text className={`pt-1 text-negative font-poppins`}>Tidak Ada Jadwal</Text>
              {/* <Text>{text}</Text> */}
          </View>)}
    </SafeAreaView>
  )
}

export default ScreenAbsenAwal

const handleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
    content: {
      title: "Absen Masuk! 🔔",
      body: 'Anda Sudah Bisa Absen Masuk',
      data: { data: 'Absensi Masuk' },
    },
    trigger: { seconds: 1 },
  });
}


const kurangiJam = (
    jam , //jam default
    num = 1, // default jam kurang 
)=> {
    let str = jam === null? "07:00:00": jam
    let h = parseInt(str.slice(0, 2)) 
    let hh = (h < 1? 24 : h) - num
    let h_str = hh < 10 ? "0"+ hh : hh
    let m = str.slice(3,-3)
    return h_str+':'+m+':00'
}
const kurangiMenit = (
    jam, //menit default
    num = 1, // default jam kurang 
)=> {
    let str = jam === null? "07:00:00": jam
    let h = parseInt(str.slice(0, 2)) //parse jam
    let m = parseInt(str.slice(3, -3)) //parse menit
    let min_jam = 0;
    let min_menit = 0;
    if (m - num <= 0) {
        min_jam = min_jam + 1
        min_menit = 60 - num
    } else {
        min_menit = m - num
    }
    let hh = (h < 1? 24 : h) - min_jam
    let mm = min_menit
    let h_str = hh < 10 ? "0" + hh : hh
    let m_str = mm < 10 ? "0" + mm : mm
    return h_str+':'+m_str+':00'
}
const tambahiJam = (
    jam , //jam default
    num = 1, // default jam kurang 
)=> {
    let str = jam === null? "07:00:00": jam
    let h = parseInt(str.slice(0, 2)) 
    let hh = (h > 23? 0 : h) + num
    let h_str = hh < 10 ? "0"+ hh : hh
    let m = str.slice(3,-3)
    return h_str+':'+m+':00'
}



function hitungJarak(lokasiku, lokasiKantor)  {
        // console.log(lokasiku)
let distance = null      
let R = 6371; // Radius of the earth in km
let dLat = (lokasiku.latitude - lokasiKantor.latitude) * Math.PI / 180;  // Javascript functions in radians
let dLon = (lokasiku.longitude - lokasiKantor.longitude) * Math.PI / 180;  // Javascript functions in radians
let a = 
    0.5 - Math.cos(dLat)/2 + 
    Math.cos(lokasiKantor.latitude * Math.PI / 180) * Math.cos(lokasiku.latitude * Math.PI / 180) * 
    (1 - Math.cos(dLon))/2;

let dist = R * 2 * Math.asin(Math.sqrt(a)); //in Km
let mtr = dist * 1000;
distance = mtr
return distance
}