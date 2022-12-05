import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppBtn, AppConfirm, AppLoader } from '../../components'
import { IMGS, ROUTES, tw } from '../../constants'
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
      setMsg('Absensi Telah Success terkirim, Terimakasih ...')
    }).catch(error => {
      // console.log('absen :', error.response);
        setWaiting(false)
        setMsg('Maaf Ada Kesalahan, Harap Ulangi')
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
      {/* <AppConfirm visible={msg !== null} msg={msg} status="Error"
        onOk={() => scanAgain()}
        onDismiss={() => navigation.navigate(ROUTES.SCREEN_ABSEN_AWAL)}
        labelBtnBack="Kembali" labelBtnOk='Ok'
      /> */}

      <Image
        style={tw.style('w-48 h-64')}
        source={IMGS.madSalehMinum}
      /> 
      <View className="my-4">
        <Text className="font-poppins" >{ msg }</Text>
      </View>
      <AppBtn label="Kembali" clicked={()=>navigation.navigate(ROUTES.SCREEN_ABSEN_AWAL)} />
    </View>
  )
}

export default LoadingAbsen