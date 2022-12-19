import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppBtn, AppConfirm, AppLoader } from '../../components'
import { IMGS, ROUTES, tw } from '../../constants'
import { useDispatch } from 'react-redux'
import { getAbsenTodayAsync, setCond } from '../../redux/features/jadwal/absenReducer'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { api } from '../../helpers/axiosInterceptor'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoadingAbsen = ({ navigation, route }) => {
  
  const { data, tanggal, jam, status, kategory_id } = route.params
  const dispatch = useDispatch()
  const [waiting, setWaiting] = useState(false)
  const [msg, setMsg] = useState(null)
  const [isError, setIsError] = useState(false)

  // console.log(route)

  const sendQrCode = async () => {
    setWaiting(true)


    let form = {
      // id: id,
      qr: data,
      tanggal: tanggal,
      jam: jam,
      status: status,
      kategory_id:kategory_id
    }
    await api.post('/v2/absensi/qr/scan2', form).then((response) => {
      setWaiting(false)
      status === 'masuk'? saveStore('checkIn') : saveStore('checkOut')
      setMsg('Absensi Telah Success terkirim, Terimakasih ...')
    }).catch(error => {
      console.log('absen error :', error.response);
      setWaiting(false)
      setIsError(true)
      setMsg('Maaf Ada Kesalahan, Harap Ulangi')
    })
  }

  const scanAgain = () => {
    setMsg(null)
    navigation.navigate(ROUTES.QR_SCAN)
  }

  const saveStore = async (txt) => {
        await AsyncStorage.setItem('condAbsen', txt)
        dispatch(setCond(txt))
    }

  useEffect(() => {
    (() => {
        sendQrCode()
      })()
    },[])
  return (
    <View className="flex-1 justify-center items-center">
      <AppLoader visible={waiting} />
      {/* <AppConfirm visible={msg !== null} msg={msg} status="Error"
        onOk={() => scanAgain()}
        onDismiss={() => navigation.navigate(ROUTES.SCREEN_ABSEN_AWAL)}
        labelBtnBack="Kembali" labelBtnOk='Ok'
      /> */}
      {isError ? (
      <Icon name="alert-octagram-outline" color={tw.color('negative')} size={80} />
      ) : (
          <Image
            style={tw.style('w-48 h-64')}
            source={IMGS.madSalehMinum}
          /> 
      )}
      
      <View className="my-4">
        <Text className={`font-poppins ${isError? 'text-negative': ''}`} >{ msg }</Text>
      </View>
      <AppBtn color={`${isError? 'negative':'primary'}`} label="Kembali" clicked={()=>navigation.navigate(ROUTES.SCREEN_ABSEN_AWAL)} />
    </View>
  )
}

export default LoadingAbsen