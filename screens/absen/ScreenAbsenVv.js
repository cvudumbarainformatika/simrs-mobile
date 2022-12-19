import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { AppBtn, AppLoader } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { setCond, setIsActive } from '../../redux/features/jadwal/absenReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useEffect } from 'react'
import { getCurrentJadwal } from '../../redux/features/jadwal/jadwalsReducer'

import dayjs from 'dayjs'
import 'dayjs/locale/id'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isBetween from 'dayjs/plugin/isBetween'
import { ROUTES, tw } from '../../constants'
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(isBetween)

const ScreenAbsenVv = ({navigation}) => {

    const dispatch = useDispatch();
    const [date, setDate] = useState(dayjs().locale("id"))
    // const [cond, setCond] = useState('idle') // idle || start
    const [schedule, setSchedule] = useState(null)

    const {cond, waiting} = useSelector(state => state.absen)
    const currentJadwal = useSelector((state) => getCurrentJadwal(state, date.format("dddd")))
    // const { hari, masuk, pulang, status, kategory_id } = currentJadwal

    const saveStore = async (txt) => {
        await AsyncStorage.setItem('condAbsen', txt)
        dispatch(setCond(txt))
    }

    const storeSchedule = async (nJadwal) => {
        await AsyncStorage.setItem('newSchedule', JSON.stringify(nJadwal))
        setSchedule(nJadwal)
    }
    const removeStore = async () => {
        await AsyncStorage.removeItem('condAbsen');
        await AsyncStorage.removeItem('newSchedule');
        dispatch(setCond('idle'))
        setSchedule('null')

        currentJadwal
    }


    const callFirst = async () => {
        try {
            let condition = await AsyncStorage.getItem('condAbsen');
            let nJadwal = await AsyncStorage.getItem('newSchedule');
            console.log('condition', condition)
            if (condition === null) { // idle
                dispatch(setCond('idle'))
                searchJadwalAndSet()
            } else {
                dispatch(setCond(condition))
            }

            if (nJadwal === null) {
                setSchedule(null)
            } else {
                nJadwal = JSON.parse(nJadwal)
                setSchedule(nJadwal)
            }

        } catch (e) {
            console.log(`ambil kondisi Error : ${e}`)
        }
    }

    
        const masuk = "23:08:00"
        const pulang = "00:00:00"
        const kategory_id = 5
        const status = "2"

    const searchJadwalAndSet = () => {

        const hariIni = date.format("YYYY-MM-DD")
        let mulaiWaktuMasuk;
        let mulaiWaktuPulang;
        let stopWaktuAbsen;

        if (status === "2" || status === 2) {
            mulaiWaktuMasuk = dayjs(hariIni + " " + masuk).subtract(30, 'minute').locale('id')
            if (masuk > pulang) {
                mulaiWaktuPulang = dayjs(hariIni + " " + pulang).add(1, 'day').locale('id')
                stopWaktuAbsen = dayjs(hariIni + " " + pulang).add(1, 'day').add(1, 'hour').locale('id')
            } else {
                mulaiWaktuPulang = dayjs(hariIni + " " + pulang).locale('id')
                stopWaktuAbsen = dayjs(hariIni + " " + pulang).add(1, 'hour').locale('id')
                // stopWaktuAbsen = dayjs(hariIni + " " + pulang).add(1, 'm').locale('id')
                // tglAbsen = dayjs(hariIni).locale('id')

            }
        } else {
            mulaiWaktuMasuk = null,
            mulaiWaktuPulang = null,
            stopWaktuAbsen = null
        }
        

        let newJadwals = {
            mulaiWaktuMasuk: mulaiWaktuMasuk,
            mulaiWaktuPulang: mulaiWaktuPulang,
            stopWaktuAbsen:stopWaktuAbsen
        }

        saveStore('start')
        storeSchedule(newJadwals)
    }
    

    let text = 'start'
    let rangeMasuk = false;
    let rangePulang = false;
    let stopped = false;
    let interval;

    let sts = ""
    let icn = "bell-ring"
    let clr = "primary"
    if (status === "2" || status === 2) {
        if (schedule !== null) {
            const { mulaiWaktuMasuk, mulaiWaktuPulang, stopWaktuAbsen } = schedule
            let checkIn = dayjs(mulaiWaktuMasuk).format("DD MMM YYYY, HH:mm")
            let checkOut = dayjs(mulaiWaktuPulang).format("DD MMM YYYY, HH:mm")

            
            rangeMasuk = dayjs().isBetween(dayjs(mulaiWaktuMasuk), dayjs(mulaiWaktuPulang))
            rangePulang = dayjs().isBetween(dayjs(mulaiWaktuPulang), dayjs(stopWaktuAbsen))
            stopped = dayjs().isSameOrAfter(dayjs(stopWaktuAbsen))
           
           

            if (rangeMasuk) {
                text = "waktu masuk"
                if (cond === 'checkIn') {
                    sts = "Sudah Absen Masuk"
                    icn = "check-decagram"
                    clr = "primary"
                    
                } else {
                    sts = "Absen Masuk"
                    icn = "bell-ring"
                    clr = "primary"
                }
            } else if (rangePulang) {
                text = "waktu pulang"
                if (cond === 'checkOut') {
                    sts = "Sudah Absen Masuk"
                    icn = "check-decagram"
                    clr = "negative"
                    
                } else {
                    sts = "Absen Pulang"
                    icn = "bell-ring"
                    clr = "negative"
                }
            } else if (stopped) {
                text = "Absen Complete"
                sts = "Absen Complete"
                icn = "check-decagram"
                clr = "secondary"

                removeStore()
                setTimeout(() => {
                    navigation.navigate(ROUTES.HOME_TAB)
                }, 1000 * 60 * 5)
            } else {
                text = "belum saatnya absen"
                sts = "Belum Saatnya Absen"
                icn = "calendar-clock"
                clr = "gray-dark"
            }

            // console.log('range masuk',rangeMasuk)
            // console.log('range pulang',rangePulang)
            // console.log('stop',stopped)
            console.log('stop waktu absen', dayjs(stopWaktuAbsen).format("YYYY-MM-DD, HH:mm"))
            // console.log('mulai waktu masuk', dayjs(mulaiWaktuMasuk).format("DD MMMM YYYY, HH:mm"))
        } else {
            text = 'tunggu...'
        }
    } else {
        text = "libur"
    }



    console.log('schedule', schedule)

    const toQrScan = () => {
        let tglAbsen;
        let form;
        const hariIni = date.format("YYYY-MM-DD")
        if (masuk > pulang) {
            tglAbsen = dayjs(hariIni).subtract(1, 'day').locale('id')
        } else {
            tglAbsen = dayjs(hariIni).locale("id")
        }
        tglAbsen = dayjs(tglAbsen).format("YYYY-MM-DD")

        if (sts === "Absen Masuk") {
            form = {
                tanggal: tglAbsen,
                jam: date.format("HH:mm:ss"),
                status: "masuk",
                kategory_id:kategory_id
            }
        } else {
            form = {
                tanggal: tglAbsen,
                jam: date.format("HH:mm:ss"),
                status: "pulang",
                kategory_id:kategory_id
            }
        }

        navigation.navigate(ROUTES.QR_SCAN, form)
    }

    useEffect(() => {
        setDate(dayjs().locale("id"))
        const subscribe = navigation.addListener("focus", () => {
            callFirst();
        })
        
        console.log('useEffect', stopped)

        return ()=> subscribe
    },[rangeMasuk,rangePulang])


    return (
        <View className="flex-1 justify-center items-center">
            <AppLoader visible={waiting} />
             <TouchableOpacity className="absolute top-10 right-4" onPress={()=> navigation.navigate(ROUTES.HOME_TAB)}>
                <Icon name="close" color="black" size={42} />
            </TouchableOpacity> 
            {/* <Text>ScreenAbsenVv  {cond} { text }</Text> */}
            
            {/* <AppBtn label="test" clicked={()=> saveStore('start')}  /> */}
            {/* <AppBtn label="rem" color={'negative'} clicked={() => removeStore()} /> */}
            
            {status === '2' && (
                <>
                    <Icon name={icn} color={tw.color(clr)} size={80} />
                    <Text className={`pt-1 text-${clr} font-poppins`}>{sts}</Text>
                    {(sts === "Absen Masuk" || sts === "Absen Pulang") && (
                      <TouchableOpacity
                          className="w-18 h-18 bg-dark overflow-hidden absolute bottom-10 rounded-full"
                          onPress={()=> toQrScan()}
                      >
                          <View className="justify-center items-center self-center h-18 p-4">
                              <Icon name="qrcode-scan" color={'white'} size={32} />
                          </View>
                      </TouchableOpacity>
                    )}
                  
                </>
            )}
            {status === '1' &&(<View className="self-center justify-center items-center">
              <Icon name="calendar" color={tw.color("negative")} size={80} />
              <Text className={`pt-1 text-negative font-poppins`}>Tidak Ada Jadwal</Text>
              {/* <Text>{text}</Text> */}
          </View>)}
        </View> 
    
  )
}

export default ScreenAbsenVv