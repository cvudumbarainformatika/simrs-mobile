import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppBtn, AppConfirm, AppLoader } from '../../components'
import { ROUTES } from '../../constants'
import { useDispatch } from 'react-redux'
import { getAbsenTodayAsync } from '../../redux/features/jadwal/absenReducer'
import { api } from '../../helpers/axiosInterceptor'

const LoadingAbsen = ({ navigation, route }) => {
  
  const { id, data } = route.params
  const dispatch = useDispatch()
  const [waiting, setWaiting] = useState(false)
  const [msg, setMsg] = useState(null)

  const sendQrCode = async () => {
    setWaiting(true)
    let form = {
      id: id,
      qr: data
    }
    await api.post('/v2/absensi/qr/scan', form).then((response) => {
      // dispatch(getAbsenTodayAsync())
      setWaiting(false)
    }).catch(error => {
      // console.log('absen :', error.response);
        setWaiting(false)
        setMsg('Maaf Ada Kesalahan, Ulangi Lagi?')
    })
  }

  const scanAgain = () => {
    setMsg(null)
    navigation.navigate(ROUTES.QR_SCAN)
  }

  useEffect(() => {
    (() => {
        sendQrCode()
      })()
    },[])
  return (
    <View className="flex-1 justify-center items-center">
      <AppLoader visible={waiting} />
      <AppConfirm visible={msg !== null} msg={msg} status="Error" onOk={() => scanAgain()} onDismiss={() => navigation.navigate(ROUTES.SCREEN_ABSEN_AWAL)}
        labelBtnBack="Kembali" labelBtnOk='Ok'
      />
      <AppBtn label="Kembali" clicked={()=>navigation.navigate(ROUTES.SCREEN_ABSEN_AWAL)} />
    </View>
  )
}

export default LoadingAbsen