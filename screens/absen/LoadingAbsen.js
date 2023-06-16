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
import * as Location from 'expo-location';

const LoadingAbsen = ({ navigation, route }) => {

  const { data, tanggal, jam, status, kategory_id } = route.params
  const dispatch = useDispatch()
  const [waiting, setWaiting] = useState(false)
  const [msg, setMsg] = useState(null)
  const [isError, setIsError] = useState(false)

  const { saveStore } = useContext(AbsenContext)


  const [location, setLocation] = useState({
    latitude: -6.745297732746753,
    longitude: 113.20952966064942,
  });
  const [mapRegion, setMapRegion] = useState({
    // latitude: -7.745281861965679,//yang lama
    latitude: -7.745527419472046,
    // longitude: 113.21061643874336,
    longitude: 113.21081986255665,
    latitudeDelta: 0.0015,
    longitudeDelta: 0.0015,
  });

  const [errorMsg, setErrorMsg] = useState(null)
  const [radius, setRadius] = useState(100) //default 30 kesepakatan
  const [distance, setDistance] = useState(0) // jarak

  // console.log(route)

  const handleLocation = async () => {
    setWaiting(true)
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Harap Ijinkan Lokasi Anda ...');
      setLocation(null)
      setWaiting(false)
      return;
    }

    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: 6 });
    // let location = await Location.watchPositionAsync({ enableHighAccuracy: true }, (loc) => setLocation(loc.coords))
    setLocation(location.coords);
    // hitungJarak(location.coords, mapRegion)
    // console.log('location ...', location)

  }

  let jarakDariKantor = 0;
  let isFar = true;
  if (errorMsg) {
    jarakDariKantor = 0
  } else if (location) {
    jarakDariKantor = hitungJarak(location, mapRegion)
    if (jarakDariKantor > radius) {
      isFar = 'Jauh';
    } else {
      isFar = 'dekat';

    }
    console.log('ssss', jarakDariKantor)
    console.log('aaa', isFar)
  } else {
    jarakDariKantor = 0
  }

  useEffect(() => {

    let interval = setInterval(() => {
      handleLocation()
    }, 1000)

    return () => clearInterval(interval)
  }, []);

  const sendQrCode = async () => {
    setWaiting(true)

    let form = {
      // id: id, 
      qr: data,
      tanggal: tanggal,
      jam: jam,
      status: status,
      kategory_id: kategory_id
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
      await api.post('/v2/absensi/qr/scan2', form).then((response) => {
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
    // (() => {
    //   sendQrCode()
    // })()

    const backAction = () => {
      navigation.navigate(ROUTES.SCREEN_ABSEN_AWAL)
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, [])


  if (errorMsg !== null || errorMsg !== '') {
    return (
      <AppAlert visible={errorMsg !== null} msg={errorMsg} onOk={() => {
        setErrorMsg(null);
        navigation.goBack()
      }} />
    )
  }


  return (
    <View className="flex-1 justify-center items-center p-10">
      <Text className="font-poppins">Sek perbaikan Boss</Text>
      {/* <AppLoader visible={waiting} />
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
      <AppBtn color={`${isError ? 'negative' : 'primary'}`} label="Kembali" clicked={() => navigation.navigate(ROUTES.SCREEN_ABSEN_AWAL)} /> */}
    </View>
  )
}

export default LoadingAbsen


function hitungJarak(lokasiku, lokasiKantor) {
  console.log('hitung jarak ...', lokasiku)
  if (lokasiku.latitude == lokasiKantor.latitude && lokasiku.longitude == lokasiKantor.longitude) {
    return 0;
  }

  const radlat1 = (Math.PI * lokasiku.latitude) / 180;
  const radlat2 = (Math.PI * lokasiKantor.latitude) / 180;

  const theta = lokasiku.longitude - lokasiKantor.longitude;
  const radtheta = (Math.PI * theta) / 180;

  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344; //convert miles to km
  return Math.trunc(dist * 1000);
}