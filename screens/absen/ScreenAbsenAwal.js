import { View, Text, TouchableOpacity } from 'react-native'
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
import { getAbsenTodayAsync } from '../../redux/features/jadwal/absenReducer'

import * as Location from 'expo-location';
import dayjs from 'dayjs'
require('dayjs/locale/id')

const ScreenAbsenAwal = ({ navigation, route }) => {
    
   

    // jadwal harii ini
    const dispatch = useDispatch()
    const [date, setDate] = useState(dayjs().locale("id"))

    const currentJadwal = useSelector((state) => getCurrentJadwal(state, date.format("dddd")))
    const { hari, masuk, pulang, status, kategory_id } = currentJadwal
    const { id, absenToday, interv, waiting, isDone } = useSelector(state => state.absen)


    const [absenMasuk, setAbsenMasuk] = useState(false)
    const [absenPulang, setAbsenPulang] = useState(false)
    const [sudahAbsenMasuk, setSudahAbsenMasuk] = useState(false)
    const [sudahAbsenPulang, setSudahAbsenPulang] = useState(false)
    const [vMsg, setVMsg] = useState('Belum Ada Jadwal Hari ini')
    const [vIcon, setVIcon] = useState('calendar-blank')
    const [vColor, setVColor] = useState('negative')
    
    



    const configAbsen = () => {

       

        if (status === '1' || status === 1) { // jika libur atau yg lainnya
            setAbsenMasuk(false)
            setAbsenPulang(false)
            setSudahAbsenMasuk(false)
            setSudahAbsenPulang(false)
            setVMsg('Belum Ada Jadwal Hari ini')
            setVIcon('calendar-blank')
            setVColor('gray')
            console.log('coba status 1')

        }else if (status === '2' || status === 2 && masuk <= "18:00:00") {
            let bukaAbsenMasuk = date.format("HH:mm") >= kurangiJam(masuk, 1) && date.format("HH:mm") <= kurangiMenit(pulang,30)
            let bukaAbsenPulang = date.format("HH:mm") >= kurangiMenit(pulang, 30) && date.format("HH:mm") <= tambahiJam(pulang, 5)

            if (bukaAbsenMasuk) {
                if (absenToday === null || absenToday === 410) { // belum absen masuk
                    setAbsenMasuk(true)
                    setSudahAbsenMasuk(false)
                    setAbsenPulang(false)
                    setSudahAbsenPulang(false)
                    setVMsg('Waktu Absen Masuk')
                    setVIcon('bell-ring')
                    setVColor('primary')
                    console.log('belum absen masuk')
                } else { // sudah absen masuk
                    setAbsenMasuk(false)
                    setSudahAbsenMasuk(true)
                    setAbsenPulang(false)
                    setSudahAbsenPulang(false)
                    setVMsg('Menunggu Absen Masuk')
                    setVIcon('calendar-clock')
                    setVColor('secondary')
                    console.log('sudah absen masuk')
                }
            } else {
                if (bukaAbsenPulang && absenToday !== null) {
                    console.log('coba buka absen pulang && absen today !== null')
                    if (absenToday.pulang === null) {
                        setAbsenMasuk(false)
                        setSudahAbsenMasuk(true)
                        setAbsenPulang(true)
                        setSudahAbsenPulang(false)
                        setVMsg('Waktu Absen Pulang !')
                        setVIcon('bell-ring')
                        setVColor('negative')
                        console.log('coba buka absen pulang && absen today.pulang === null')
                    } else {
                        setAbsenMasuk(false)
                        setSudahAbsenMasuk(true)
                        setAbsenPulang(false)
                        setSudahAbsenPulang(true)
                        setVMsg('Absen Complete')
                        setVIcon('check-decagram')
                        setVColor('primary')
                        console.log('coba buka absen pulang && absen today.pulang !== null')
                    }
                }  
            }


            if (!bukaAbsenMasuk && !bukaAbsenPulang) {
                console.log('tidak ada absen masuk dan pulang')
                setAbsenMasuk(false)
                setAbsenPulang(false)
                setSudahAbsenMasuk(false)
                setSudahAbsenPulang(false)
                setVMsg('Belum Ada Jadwal')
                setVIcon('calendar-blank')
                setVColor('gray')
            }
        } else {
            setAbsenMasuk(false)
            setAbsenPulang(false)
            setSudahAbsenMasuk(false)
            setSudahAbsenPulang(false)
            setVMsg('Belum Ada Jadwal')
            setVIcon('calendar-blank')
            setVColor('gray')
            console.log('status sleain 1 dan 2')
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
        // dispatch(getJadwalsAsync());
        dispatch(getAbsenTodayAsync());
        // dispatch(getKategoriesAscync());
        const interval = setInterval(()=> setDate(dayjs().locale("id")) ,1000)
        configAbsen()
        getLocation()
        console.log('absens Today :', absenToday)
        return () => clearInterval(interval)
    },[status])
  return (
      <View className="flex-1 justify-center items-center">
          <AppLoader visible={waiting} />
         <TouchableOpacity className="absolute top-6 right-4" onPress={()=> navigation.navigate(ROUTES.HOME_TAB)}>
            <Icon name="close" color="black" size={32} />
          </TouchableOpacity> 

          <View className="absolute top-20 items-center">
              <Icon name="lock" color={tw.color('gray')} size={24} />
            <Text className="text-gray text-3xl font-bold pt-2">{date.format("HH:mm:ss")}</Text>
        </View>

          {/* CONTENT */}
          <View className="self-center justify-center items-center">
              <Icon name={vIcon} color={tw.color(vColor)} size={80} />
              <Text className={`pt-1 text-${vColor}`}>{vMsg}</Text>
                <Text>{text}</Text>
          </View>
          
          {(absenMasuk || absenPulang) &&(<TouchableOpacity
              className="w-18 h-18 bg-dark overflow-hidden absolute bottom-8 rounded-full"
              onPress={() => navigation.navigate(ROUTES.QR_SCAN, { kategory_id })}
          >
              <View className="justify-center items-center self-center h-18 p-4">
                  <Icon name="qrcode-scan" color={'white'} size={32} />
              </View>
          </TouchableOpacity>)}
    </View>
  )
}

export default ScreenAbsenAwal


const kurangiJam = (
    jam = "07:00:00", //jam default
    num = 1, // default jam kurang 
)=> {
    let str = jam
    let h = parseInt(str.slice(0, 2)) 
    let hh = (h < 1? 24 : h) - num
    let h_str = hh < 10 ? "0"+ hh : hh
    let m = str.slice(3,-3)
    return h_str+':'+m+':00'
}
const kurangiMenit = (
    jam = "07:00:00", //menit default
    num = 1, // default jam kurang 
)=> {
    let str = jam
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
    jam = "07:00:00", //jam default
    num = 1, // default jam kurang 
)=> {
    let str = jam
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