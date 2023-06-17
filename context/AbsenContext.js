import { View, Text } from 'react-native'
import React, { createContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'
import { getCurrentJadwal } from '../redux/features/jadwal/jadwalsReducer'
import { useFocusEffect, useNavigation } from '@react-navigation/native'



import dayjs from 'dayjs'
import 'dayjs/locale/id'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(isBetween)



export const AbsenContext = createContext();


export const AbsenProvider = ({ children }) => {
    // ini penting bahwa ... keadaan awal tidak terdefinisi, karena
    // we need to wait for the async storage to return its value 
    // before rendering anything
    const [cond, setCond] = useState('idle');
    const [isStart, setIsStart] = useState(false)
    const [schedule, setSchedule] = useState()
    const [date, setDate] = useState(dayjs().locale("id"))
    const [isWait, setIsWait] = useState(false)

    const currentJadwal = useSelector((state) => getCurrentJadwal(state, date.format("dddd")))
    const { hari, masuk, pulang, status, kategory_id } = currentJadwal


    const saveStore = async (txt) => {
        await AsyncStorage.setItem('condAbsen', txt)
        setCond(txt)
    }

    const saveSchedule = async (nJadwal) => {
        await AsyncStorage.setItem('newSchedule', JSON.stringify(nJadwal))
        setSchedule(nJadwal)
    }

    const searchJadwalAndSet = () => {
        console.log('searchJadwalAndSet...')
        // removeAllStore()
        AsyncStorage.removeItem('newSchedule')


        const hariIni = date.format("YYYY-MM-DD")
        let mulaiWaktuMasuk;
        let mulaiWaktuPulang;
        let stopWaktuAbsen;
        let statusStorrage;
        let kategoryStorrage;

        if (status === "1" || status === 1) { //jika libur
            mulaiWaktuMasuk = null;
            mulaiWaktuPulang = null;
            stopWaktuAbsen = null;
            statusStorrage = null;
            kategoryStorrage = null;
        } else { // jika masuk
            saveStore('start')
            setIsStart(true)
            mulaiWaktuMasuk = dayjs(hariIni + " " + masuk).subtract(30, 'minute').locale('id')
            statusStorrage = status;
            kategoryStorrage = kategory_id;
            if (masuk > pulang) {
                mulaiWaktuPulang = dayjs(hariIni + " " + pulang).add(1, 'day').locale('id')
                stopWaktuAbsen = dayjs(hariIni + " " + pulang).add(1, 'day').add(2, 'hour').locale('id') // tambah 2 jam dan 1 hari
            } else {
                mulaiWaktuPulang = dayjs(hariIni + " " + pulang).locale('id')
                stopWaktuAbsen = dayjs(hariIni + " " + pulang).add(2, 'hour').locale('id') // tambah 2 jam
            }
        }

        let newJadwals = {
            mulaiWaktuMasuk: mulaiWaktuMasuk,
            mulaiWaktuPulang: mulaiWaktuPulang,
            stopWaktuAbsen: stopWaktuAbsen,
            statusStorrage: statusStorrage,
            kategoryStorrage: kategoryStorrage
        }

        saveSchedule(newJadwals)


        console.log('searchJadwalAndSet', newJadwals)
        return
    }

    // useFocusEffect(
    //     React.useCallback(() => {
    //         console.log('focus effect in context... :', currentJadwal);
    //     }, [currentJadwal]),
    // );

    // const navigation = useNavigation()

    const appContextValue = React.useMemo(
        () => ({
            currentJadwal
        }), [currentJadwal])

    // console.log('appContextValue :', appContextValue)

    React.useEffect(() => {
        setDate(dayjs().locale("id"))
        const init = async () => {
            setIsWait(true)

            try {
                const condition = await AsyncStorage.getItem('condAbsen');
                const nJadwal = await AsyncStorage.getItem('newSchedule');
                setSchedule(nJadwal !== null ? JSON.parse(nJadwal) : false)

                if (condition === null || condition === 'idle') {
                    searchJadwalAndSet()
                    setIsStart(false)
                    setTimeout(() => setIsWait(false), 1000)
                } else {
                    setCond(condition)
                    setTimeout(() => setIsWait(false), 1000)
                }
            } catch (e) {
                console.log(`storrage Error : ${e}`)
                setTimeout(() => setIsWait(false), 1000)
                setIsStart(false)
            }

        };
        init();
    }, [appContextValue])

    React.useEffect(() => {
        const interval = setInterval(() => {
            setDate(dayjs().locale("id"))
        }, 3000)


        return () => {
            clearInterval(interval)
        }
    }, [isStart])

    if (schedule === null || !schedule || cond === null) {
        return null
    }

    return (
        <AbsenContext.Provider value={{
            cond, schedule, isWait, currentJadwal,
            setCond, setSchedule, searchJadwalAndSet, saveStore,
        }}>
            {children}
        </AbsenContext.Provider>
    )
}