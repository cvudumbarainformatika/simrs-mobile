import { View, Text, Image, BackHandler } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppAlert, AppBtn, AppConfirm, AppLoader } from '../../components'
import { IMGS, ROUTES, tw } from '../../constants'
import { useDispatch } from 'react-redux'
// import { getAbsenTodayAsync, setCond } from '../../redux/features/jadwal/absenReducer'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { api } from '../../helpers/axiosInterceptor'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AbsenContext } from '../../context/AbsenContext'


const LoadingAbsen = ({ navigation, route }) => {

  const { data, tanggal, jam, status, kategory_id } = route.params
  const dispatch = useDispatch()
  const [waiting, setWaiting] = useState(false)
  const [msg, setMsg] = useState(null)
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const { saveStore } = useContext(AbsenContext)




  const sendQrCode = async () => {
    setWaiting(true)

    let form = {
      // id: id, 
      qr: data,
      tanggal: tanggal,
      jam: jam,
      status: status,
      kategory_id: kategory_id,
      lokasi: 'ok',
    }

    console.log('form ... ', form)

    if (data === "wajah" || data === "khusus") {
      await api.post('/v2/absensi/qr/wajah', form).then((response) => {
        status === 'masuk' ? saveStore('checkIn') : saveStore('checkOut')
        setMsg('Absensi Telah Success terkirim, Terimakasih ...')
        setWaiting(false)
        waktuTutup()
      }).catch(error => {
        console.log('absen wajah error :', error.response.data);
        setIsError(true)
        setMsg('Maaf Ada Kesalahan, Harap Ulangi')
        setWaiting(false)
        waktuTutup()
      })
    } else {
      // await api.post('/v2/absensi/qr/scan2', form).then((response) => { //INI YANG LAMA
      await api.post('/v2/absensi/scan/qr', form).then((response) => {
        status === 'masuk' ? saveStore('checkIn') : saveStore('checkOut')
        setMsg('Absensi Telah Success terkirim, Terimakasih ...')
        setWaiting(false)
        waktuTutup()
      }).catch(error => {
        console.log('absen error :', error.response);
        setIsError(true)
        setMsg('Maaf Ada Kesalahan, Harap Ulangi')
        setWaiting(false)
        waktuTutup()
      })
    }

  }

  const scanAgain = () => {
    setMsg(null)
    navigation.navigate(ROUTES.QR_SCAN)
  }

  function waktuTutup() {
    setTimeout(() => {
      navigation.navigate(ROUTES.SCREEN_ABSEN_AWAL)
    }, 3000)
  }






  useEffect(() => {
    (() => {
      sendQrCode()
    })()

    const backAction = () => {
      navigation.navigate(ROUTES.SCREEN_ABSEN_AWAL)
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, [])


  // if (errorMsg !== null || errorMsg !== '') {
  //   return (
  //     <AppAlert visible={errorMsg !== null} msg={errorMsg} onOk={() => {
  //       setErrorMsg(null);
  //       scanAgain()
  //     }} />
  //   )
  // }


  return (
    <View className="flex-1 justify-center items-center p-10">
      {/* <Text className="font-poppins">Sek perbaikan Boss</Text> */}
      <AppLoader visible={waiting} />
      {isError ? (
        <Icon name="alert-octagram-outline" color={tw.color('negative')} size={80} />
      ) : (
        <Image
          className="w-28 h-36"
          source={IMGS.madSalehMinum}
        />
      )}

      <View className="my-8">
        <Text className={`font-poppins text-center ${isError ? 'text-negative' : ''}`} >{msg}</Text>
      </View>
      <AppBtn color={`${isError ? 'negative' : 'primary'}`} label="Kembali" clicked={() => navigation.navigate(ROUTES.SCREEN_ABSEN_AWAL)} />
    </View>
  )
}

export default LoadingAbsen


