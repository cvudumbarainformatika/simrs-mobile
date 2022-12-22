import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { AppBtn, AppLoader } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { setCond, setIsActive, setWaiting } from '../../redux/features/jadwal/absenReducer'
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
import { useCallback } from 'react'
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(isBetween)



const ScreenAbsenVv = ({navigation}) => {

    const dispatch = useDispatch();
    const [date, setDate] = useState(dayjs().locale("id"))
    const [waiting, setWaiting] = useState(false)
    // const [cond, setCond] = useState('idle') // idle || start
    const [schedule, setSchedule] = useState(null)

    const {cond} = useSelector(state => state.absen)
    const currentJadwal = useSelector((state) => getCurrentJadwal(state, date.format("dddd")))
    const { hari, masuk, pulang, status, kategory_id } = currentJadwal

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
    }
    const removeSchedule = async () => {
        await AsyncStorage.removeItem('newSchedule');
        setSchedule('null')
    }


    // const callFirst = async () => {
    //     try {
    //         let condition = await AsyncStorage.getItem('condAbsen');
    //         let nJadwal = await AsyncStorage.getItem('newSchedule');
            
    //         if (condition === null) { 
    //             dispatch(setCond('idle'))
    //             searchJadwalAndSet()
    //         } else {
    //             if (condition === 'idle') {
    //                 // removeStore()
    //                 searchJadwalAndSet()
    //             }
    //             dispatch(setCond(condition))
    //         }

            
    //         console.log('condition callFirst', condition)

    //         if (nJadwal === null) {
    //             setSchedule(null)
    //         } else {
    //             nJadwal = JSON.parse(nJadwal)
    //             setSchedule(nJadwal)
    //         }

    //     } catch (e) {
    //         console.log(`storrage Error : ${e}`)
    //     }
    // }

    const searchJadwalAndSet = async () => {
        
        setWaiting(true)
        await AsyncStorage.removeItem('newSchedule');
        

        const hariIni = date.format("YYYY-MM-DD")
        let mulaiWaktuMasuk;
        let mulaiWaktuPulang;
        let stopWaktuAbsen;
        let statusStorrage;
        let kategoryStorrage;

        if (status === "2" || status === 2) {
            mulaiWaktuMasuk = dayjs(hariIni + " " + masuk).subtract(30, 'minute').locale('id')
            statusStorrage = status;
            kategoryStorrage = kategory_id;
            if (masuk > pulang) {
                mulaiWaktuPulang = dayjs(hariIni + " " + pulang).add(1, 'day').locale('id')
                stopWaktuAbsen = dayjs(hariIni + " " + pulang).add(1, 'day').add(2, 'hour').locale('id')
            } else {
                mulaiWaktuPulang = dayjs(hariIni + " " + pulang).locale('id')
                stopWaktuAbsen = dayjs(hariIni + " " + pulang).add(2, 'hour').locale('id')
            }
        } else {
            mulaiWaktuMasuk = null;
            mulaiWaktuPulang = null;
            stopWaktuAbsen = null;
            statusStorrage = null;
            kategoryStorrage = null;
        }
        

        let newJadwals = {
            mulaiWaktuMasuk: mulaiWaktuMasuk,
            mulaiWaktuPulang: mulaiWaktuPulang,
            stopWaktuAbsen: stopWaktuAbsen,
            statusStorrage: statusStorrage,
            kategoryStorrage:kategoryStorrage
        }

        await AsyncStorage.setItem('newSchedule', JSON.stringify(newJadwals))

        if (mulaiWaktuMasuk !== null) {
            saveStore('start')
        }
        // setTimeout(() => {
        //     setWaiting(false)
        // }, 500)
        
        setWaiting(false)
        // console.log('searchJadwalAndSet :', newJadwals)
        
    }
    

    const onClick = useCallback(() => {
        removeStore()
    }, []);

    let text = 'start'
    let rangeMasuk = false;
    let rangePulang = false;
    let stopped = false;
    let interval;

    let sts = ""
    let icn = "bell-ring"
    let clr = "primary"
    // if (status === "2" || status === 2) {
    if (schedule !== null) {
        const { mulaiWaktuMasuk, mulaiWaktuPulang, stopWaktuAbsen, statusStorrage, kategoryStorrage } = schedule
        // let checkIn = dayjs(mulaiWaktuMasuk).format("DD MMM YYYY, HH:mm")
        // let checkOut = dayjs(mulaiWaktuPulang).format("DD MMM YYYY, HH:mm")

            
        console.log('schedule Ada :', statusStorrage)
        // if (statusStorrage === null) { //jika libur
        //     searchJadwalAndSet()
        // }

        if (statusStorrage === undefined || statusStorrage === 'undefined' || kategoryStorrage === undefined || kategoryStorrage === 'undefined') {
            setSchedule({
                mulaiWaktuMasuk: mulaiWaktuMasuk,
                mulaiWaktuPulang: mulaiWaktuPulang,
                stopWaktuAbsen: stopWaktuAbsen,
                statusStorrage: status,
                kategoryStorrage: kategory_id
            })
        }

        console.log('schedule update :', statusStorrage)
            
        rangeMasuk = dayjs().isBetween(dayjs(mulaiWaktuMasuk), dayjs(mulaiWaktuPulang))
        rangePulang = dayjs().isBetween(dayjs(mulaiWaktuPulang), dayjs(stopWaktuAbsen))
        stopped = dayjs().isSameOrAfter(dayjs(stopWaktuAbsen))
         
        console.log('range masuk', rangeMasuk)
        console.log('range pulang', rangePulang)
        console.log('stop', stopped)
           

        if (statusStorrage === 2 || statusStorrage === '2') {
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
                    sts = "Sudah Absen Pulang"
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
                saveStore('idle')
                // removeStore()
                // setTimeout(() => {
                //     navigation.navigate(ROUTES.HOME_TAB)
                // }, 1000 * 60 * 5)
            } else { 
                text = "belum saatnya absen"
                sts = "Belum Saatnya Absen"
                icn = "calendar-clock"
                clr = "gray-dark"
                saveStore('idle')
            }
        } else {
            text = "Tidak Ada Jadwal"
            sts = "Tidak Ada Jadwal"
            icn = "calendar"
            clr = "negative"
            saveStore('idle')
            // setTimeout(() => {
            //     navigation.navigate(ROUTES.HOME_TAB)
            // }, 1000 * 60 * 5)
        }
            

        
        // console.log('mulai waktu masuk', dayjs(mulaiWaktuMasuk).format("DD MMMM YYYY, HH:mm"))
        // console.log('mulai waktu pulang', dayjs(mulaiWaktuPulang).format("DD MMMM YYYY, HH:mm"))
        // console.log('stop waktu absen', dayjs(stopWaktuAbsen).format("YYYY-MM-DD, HH:mm"))
        // console.log('condition terbaru: ', cond)
    }
        // } else {
        //     removeStore()
        //     setTimeout(() => {
        //         navigation.navigate(ROUTES.HOME_TAB)
        //     }, 1000 * 60 * 5)
        //     text = 'tunggu...'
        //     sts = "Ada yang salah"
        //     icn = "alert-octagram-outline"
        //     clr = "negative"
        // }
    // } else {
    //     text = "libur"
    // }

    
    // console.log('luar', cond)
    // console.log('schedule', schedule)
    // console.log('schedule asli', currentJadwal)

    const toQrScan = () => {
        const { mulaiWaktuMasuk, mulaiWaktuPulang, stopWaktuAbsen, statusStorrage, kategoryStorrage } = schedule

        let tglAbsen;
        let form;
        
        tglAbsen = dayjs(mulaiWaktuMasuk).format("YYYY-MM-DD")

        if (sts === "Absen Masuk") {
            form = {
                tanggal: tglAbsen,
                jam: date.format("HH:mm:ss"),
                status: "masuk",
                kategory_id:kategoryStorrage
            }
        } else {
            form = {
                tanggal: tglAbsen,
                jam: date.format("HH:mm:ss"),
                status: "pulang",
                kategory_id:kategoryStorrage
            }
        }

        navigation.navigate(ROUTES.QR_SCAN, form)
        // console.log(tglAbsen)
    }

    // onMounted
    // useEffect(() => {
    //     setDate(dayjs().locale("id"))
    //     const subscribe = navigation.addListener("focus", () => {
    //         callFirst();
    //     })
        
    //     console.log('useEffect', cond)
    //     console.log('useEffect', currentJadwal)

    //     return ()=> subscribe
    // }, [rangeMasuk, rangePulang])

    const callFirst = async () => {
                try {
                    let condition = await AsyncStorage.getItem('condAbsen');

                    if (condition === null) {
                        searchJadwalAndSet()
                    } else if(condition === 'idle') {
                        // removeSchedule()
                        searchJadwalAndSet()
                    } else {
                        dispatch(setCond(condition))
                    }
                    
                    console.log('condition callFirst', condition)

                } catch (e) {
                    console.log(`storrage Error : ${e}`)
                }
            }
    

    useEffect(() => {
        setDate(dayjs().locale("id"))
        const subscribe = navigation.addListener("focus", () => {
            callFirst();
        })
        
        // console.log('useEffect', cond)
        console.log('useEffect', currentJadwal)

        return () => {
            subscribe
        }
        
    },[rangeMasuk, rangePulang])


    return (
        <View className="flex-1 justify-center items-center">
            
             <TouchableOpacity className="absolute top-10 right-4" onPress={()=> navigation.navigate(ROUTES.HOME_TAB)}>
                <Icon name="close" color="black" size={42} />
            </TouchableOpacity> 
            {/* <Text>ScreenAbsenVv  {cond} { text }</Text> */}
            
            {/* <AppBtn label="test" clicked={()=> saveStore('checkIn')}  /> */}
            {/* <AppBtn label="rem" color={'negative'} clicked={() => removeStore()} /> */}


            {waiting && (
                <>
                    <Icon name={'calendar-clock'} color={tw.color('gray')} size={80} />
                    <Text className={`pt-1 text-gray font-poppins`}>Harap tunggu ...</Text>
                </>
            )}

            {!waiting && (
                 <>
                    <Icon name={icn} color={tw.color(clr)} size={80} />
                    <Text className={`pt-1 text-${clr} font-poppins`}>{sts}</Text>
                </>
            )}

            
            
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
        </View> 
    
  )
}

export default ScreenAbsenVv



