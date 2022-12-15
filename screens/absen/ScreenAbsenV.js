import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { AppCountdown } from '../../components/~global'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { getAbsenTodayAsync } from '../../redux/features/jadwal/absenReducer'
import { getCurrentJadwal } from '../../redux/features/jadwal/jadwalsReducer'
require('dayjs/locale/id')

const ScreenAbsenV = ({ navigation }) => {

  const dispatch = useDispatch();
  const [date, setDate] = useState(dayjs().locale("id"))

  const currentJadwal = useSelector((state) => getCurrentJadwal(state, date.format("dddd")))
  const { hari, masuk, pulang, status, kategory_id } = currentJadwal
  const { id, interv, absenToday, waiting, isDone, isAbsen, absenTodayMasuk, absenTodayPulang, jam } = useSelector(state => state.absen)
  
  const [timerDays, setTimerDays] = useState()
  const [timerHours, setTimerHours] = useState()
  const [timerMinutes, setTimerMinutes] = useState()
  const [timerSeconds, setTimerSeconds] = useState()

  const [cond, setCond] = useState('_awal')

  let interval;

  const startTimer = (countdownTime, jns, status) => {
    interval = setInterval(() => {
      const now = dayjs().valueOf();

      const distance = countdownTime - now;

      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor((distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / (1000));

      if (distance < 0) {
        // stop Timer
        clearInterval(interval)
        if (status) {
          setCond(status)
          return
        }
        setCond('_awal')
      } else {
        setTimerDays(days)
        setTimerHours(hours)
        setTimerMinutes(minutes)
        setTimerSeconds(seconds)
        if (jns) {
          setCond(jns)
          return
        }
        setCond('_jalan')
      }

    }, 1000)

  }

  


  //componentDidMount
  useEffect(() => {
    if (cond === '_awal') {
      dispatch(getAbsenTodayAsync());
      const hariIni = date.format("YYYY-MM-DD")
      let waktuMasuk = dayjs(hariIni + " " + kurangiJam(masuk))
      startTimer(waktuMasuk,'_tunggu_masuk' , '_waktu_masuk');
    } else if (cond === '_waktu_masuk') {
      const hariIni = date.format("YYYY-MM-DD")
      let waktuPulang = dayjs(hariIni + " " + pulang)
      if (masuk > pulang) {
        waktuPulang = dayjs(hariIni + " " + pulang).add(1, 'day')
      }
      startTimer(waktuPulang,'_tunggu_pulang' , '_waktu_pulang');
    } else if (cond === '_waktu_pulang') {
      const hariIni = date.format("YYYY-MM-DD")
      let waktuPulang = dayjs(hariIni + " " + pulang)
      if (masuk > pulang) {
        waktuPulang = dayjs(hariIni + " " + pulang).add(1, 'day')
      }
      startTimer(waktuPulang,'_tunggu_pulang' , '_waktu_pulang');
    }
    
    // console.log('jadwal today', dayjs(hariIni + " " + masuk))
    
    return () => {
      clearInterval(interval)
    }
  },[])

  return (
    <View className="flex-1 justify-center items-center">
      <AppCountdown days={timerDays} hours={timerHours} minutes={timerMinutes} seconds={timerSeconds} />
      <View>
        <Text>{ cond }</Text>
      </View>
    </View>
  )
}

export default ScreenAbsenV


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