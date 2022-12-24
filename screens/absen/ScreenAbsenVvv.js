import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState, useMemo, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux';
import { setCond, setSchedule } from '../../redux/features/jadwal/absenReducer';
import { ROUTES, tw } from '../../constants';
import { getCurrentJadwal, getJadwalsAsync } from '../../redux/features/jadwal/jadwalsReducer';
import { AppBtn, AppLoader } from '../../components';
import { useFocusEffect } from '@react-navigation/native';


import dayjs from 'dayjs'
import 'dayjs/locale/id'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isBetween from 'dayjs/plugin/isBetween'
import { AbsenContext } from '../../routers/AbsenNavigator';
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(isBetween)

const ScreenAbsenVvv = ({ navigation }) => {
    
    const { percobaan } = useContext(AbsenContext)

    const dispatch = useDispatch()
    const [date, setDate] = useState(dayjs().locale("id"))

    const { cond, schedule } = useSelector(state => state.absen)
    const { jadwals } = useSelector(state => state.jadwal)
    const currentJadwal = useSelector((state) => getCurrentJadwal(state, date.format("dddd")))
    const { hari, masuk, pulang, status, kategory_id } = currentJadwal

    // const [rdr, setRdr] = useState({
    //    sts : "",
    //     icn : "bell-ring",
    //     clr : "primary"
        
    // })

    const removeAllStore = async () => {
        await AsyncStorage.removeItem('condAbsen');
        await AsyncStorage.removeItem('newSchedule');
        dispatch(setCond('idle'))
        dispatch(setSchedule('null'))
    }

    const saveStore = async (txt) => {
        await AsyncStorage.setItem('condAbsen', txt)
        dispatch(setCond(txt))
    }
    const saveSchedule = async (nJadwal) => {
        await AsyncStorage.setItem('newSchedule', JSON.stringify(nJadwal))
        dispatch(setSchedule(nJadwal))
    }

    const removeSchedule = async () => {
        await AsyncStorage.removeItem('newSchedule');
        dispatch(setSchedule('null'))
    }
    const removeStore = async () => {
        await AsyncStorage.removeItem('condAbsen');
        dispatch(setCond('idle'))
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
        }


        let newJadwals = {
            mulaiWaktuMasuk: mulaiWaktuMasuk,
            mulaiWaktuPulang: mulaiWaktuPulang,
            stopWaktuAbsen: stopWaktuAbsen,
            statusStorrage: statusStorrage,
            kategoryStorrage:kategoryStorrage
        }

        saveSchedule(newJadwals)

        if (mulaiWaktuMasuk !== null) {
            saveStore('start')
        }
        console.log('searchJadwalAndSet', newJadwals)
    }

    const updateJadwal = (wew) => {
        console.log('updateJadwal...')
        console.log('wew', wew)
        // let nJadwal = await AsyncStorage.getItem('newSchedule');
        // nJadwal = JSON.parse(nJadwal)
        // console.log('nJadwal : ',nJadwal)
        // setSchedule(nJadwal)

        // if (schedule === null) {
        //     searchJadwalAndSet()
        // }

        // console.log('updateJadwal',schedule)
        const { mulaiWaktuMasuk, mulaiWaktuPulang, stopWaktuAbsen, statusStorrage, kategoryStorrage } = wew

        if (statusStorrage === undefined || statusStorrage === 'undefined' || kategoryStorrage === undefined || kategoryStorrage === 'undefined') {
            dispatch(setSchedule({
                mulaiWaktuMasuk: mulaiWaktuMasuk,
                mulaiWaktuPulang: mulaiWaktuPulang,
                stopWaktuAbsen: stopWaktuAbsen,
                statusStorrage: status,
                kategoryStorrage: kategory_id
            }))
        }

        let rangeMasuk = false;
        let rangePulang = false;
        let stopped = false;

        console.log('schedule update :', statusStorrage)
        console.log('updateJadwal', mulaiWaktuMasuk)

        rangeMasuk = dayjs().isBetween(dayjs(mulaiWaktuMasuk), dayjs(mulaiWaktuPulang))
        rangePulang = dayjs().isBetween(dayjs(mulaiWaktuPulang), dayjs(stopWaktuAbsen))
        stopped = dayjs().isSameOrAfter(dayjs(stopWaktuAbsen))

        console.log('range masuk', rangeMasuk)
        console.log('range pulang', rangePulang)
        console.log('stop', stopped)

        let sts = ""
        let icn = "bell-ring"
        let clr = "primary"

        if (rangeMasuk) {
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
            sts = "Absen Complete"
            icn = "check-decagram"
            clr = "secondary"
            saveStore('idle')
        } else { 
            sts = "Belum Saatnya Absen"
            icn = "calendar-clock"
            clr = "gray-dark"
            saveStore('idle')
        }

        // console.log('ee', {sts,icn,clr})
        // return setRdr({sts,icn,clr})
        // return {sts,icn,clr}
    }


    useFocusEffect(
        React.useCallback(() => {
            console.log('focus effect :', currentJadwal);

        }, [currentJadwal]),
    );

    const appContextValue = useMemo(
    () => ({
            schedule
    }),[schedule])
    
    console.log('appContextValue :', appContextValue)
    
    


    useEffect(() => {
        setDate(dayjs().locale("id"))
        const callFirst = async () => {
            try {
                let condition = await AsyncStorage.getItem('condAbsen');
                let nJadwal = await AsyncStorage.getItem('newSchedule');
                dispatch(setSchedule(nJadwal !== null ? JSON.parse(nJadwal) : null))
                
                if (condition === null || condition === 'idle') {
                    searchJadwalAndSet()
                } else {
                    dispatch(setCond(condition))
                }

            } catch (e) {
                console.log(`storrage Error : ${e}`)
            }
        };

        callFirst();

    },[navigation])

  return (
      <View className="flex-1 items-center justify-center">
        <TouchableOpacity className="absolute top-10 right-4" onPress={()=> navigation.navigate(ROUTES.HOME_TAB)}>
              <Icon name="close" color="black" size={42} />
          </TouchableOpacity> 
          

          
        {/* <AppBtn label="rem" color={'negative'} clicked={() => removeStore()} /> */}
          <Text>{ cond }</Text>
          <Text>{ percobaan }</Text>
          {/* {status === "1" || status === 1 ? (
                <Text>Libur</Text>
              ) : (
                 <Text>Masuk</Text>     
            )} */}
          
            {/* <Icon name={icn} color={tw.color(clr)} size={80} />
            <Text className={`pt-1 text-${clr} font-poppins`}>{sts}</Text> */}

    </View>
  )
}

export default ScreenAbsenVvv