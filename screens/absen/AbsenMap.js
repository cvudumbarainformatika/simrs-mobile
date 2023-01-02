import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'

import * as Location from 'expo-location';
import { useState } from 'react';
import { ROUTES, tw } from '../../constants';
import { AppAlert, AppBtn, AppLoader } from '../../components';

const AbsenMap = ({navigation, route}) => {
  // -7.745281861965679, 113.21061643874336
    const mapRef = React.useRef();

    const { status, kategory_id, tanggal, jam } = route.params
    // console.log('route map',route.params)

    // rumah ku dibuat defaul location
    const [location, setLocation] = useState({
        latitude: -6.745297732746753,
        longitude: 113.20952966064942,
    });
    const [mapRegion, setMapRegion] = useState({
        latitude: -7.745281861965679,
        longitude: 113.21061643874336,
        latitudeDelta: 0.0015,
        longitudeDelta: 0.0015,
    });
    // const [mapRegion, setMapRegion] = useState({
    //     latitude: -7.7586092975848295,
    //     longitude: 113.20952966064942,
    //     latitudeDelta: 0.0015,
    //     longitudeDelta: 0.0015,
    // });

    const [wait, setWait] = useState(false)



    const [errorMsg, setErrorMsg] = useState(null)
    const [radius, setRadius] = useState(50) //default 30 kesepakatan
    const [distance, setDistance] = useState(0) // jarak

    // let text = 'Waiting..';
    // let isFar = false;
    // if (errorMsg) {
    //     text = 'KAMU MEMATIKAN LOKASI';
    //     isFar = false;
    // } else if (location) {
    //     let jarakKamuDariKantor = hitungJarak(location, mapRegion)
    //     if (jarakKamuDariKantor > distance) {
    //         text = 'Jarak Anda dari kantor Sekitar ' + jarakKamuDariKantor + ' Meter';
    //         isFar = false;

    //     } else {
    //         text = 'Kamu berada di Area Kantor';
    //         isFar = true;
    //     }
    // }

  // console.log('aaa', location)
  const handleLocation = async () => {
    setWait(true)
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setLocation(null)
            setErrorMsg('Harap Ijinkan Lokasi Anda ...');
            setWait(false)
            return;
        }

        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        setLocation(location.coords);
        // hitungJarak(location.coords, mapRegion)
        console.log('location ...', location)
  }

    React.useEffect(() => {
    // (async () => {
    //     setWait(true)
    //     let { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== 'granted') {
    //         setLocation(null)
    //         setErrorMsg('Harap Ijinkan Lokasi Anda ...');
    //         setWait(false)
    //         return;
    //     }

    //     let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    //     setLocation(location.coords);
    //     console.log('useEffect absenMap ...', location)
    //     })();
      
      let interval = setInterval(() => {
        handleLocation()
      },1000)
      
      return ()=> clearInterval(interval)
    }, []);


    

    if (errorMsg !== null) {
        return (
            <AppAlert visible={errorMsg !== null} msg={errorMsg} onOk={() => {
                setErrorMsg(null);
                navigation.goBack()
            }} />
        )
    }


    function renderLocation() {
        let isFar = false;
        if (errorMsg) {
            isFar = false;
        } else if (location) {
            let jarakKamuDariKantor = hitungJarak(location, mapRegion)
            if (jarakKamuDariKantor > radius) {
                isFar = false;

            } else {
                isFar = true;
            }
        }

        return (
            <View className="">
                <TouchableOpacity className={`h-16 ${isFar ? 'bg-primary' : 'bg-dark'} w-full justify-center items-center`}
                    onPress={() => {
                        if (isFar) {
                            navigation.navigate(ROUTES.FACE_SCAN, {status, kategory_id, tanggal, jam })
                        } else {
                            navigation.goBack()
                        }
                    }}
                >
                    {isFar ? <Text className="font-poppins text-white">Lanjutkan Absen </Text> :
                    (<Text className="font-poppins text-white"> Kamu jauh dari kantor </Text>)
                }
                </TouchableOpacity>
                
            </View>
        )
    }


  let jarakDariKantor=0;
  if (errorMsg) {
    jarakDariKantor=0
        } else if (location) {
          jarakDariKantor = hitungJarak(location, mapRegion)
  } else {
    jarakDariKantor=0
        }
    

  return (
      <View className="flex-1">
          <Text className="font-poppinsBold z-10 bg-white text-center pt-6 pb-2">Lokasi Absen</Text>
          <View className="flex-1 bg-gray-light justify-center items-center">
            <View className={`w-36 h-36 ${jarakDariKantor > radius? "bg-negative":"bg-primary"} rounded-full border-8 border-white justify-center items-center`}>
              <Text className="font-poppinsBold text-white">{ jarakDariKantor }</Text>
            </View>
          </View>
          <View className="h-1/3 bg-white rounded-t-2xl overflow-hidden">
              <Text className="font-poppinsBold px-4 pt-3">Absensi { status }</Text>
              <Text className="font-poppins px-4 text-gray text-xs">
                  {`Jarak Kamu Dari Kantor Sekitar ${jarakDariKantor} Meter`}
              </Text>
              {/* <View className="border-t border-gray-light" /> */}
              <ScrollView className="">
                  <View className="p-4 pb-14">
                      <Text className="font-poppins text-gray-dark">
                          Scan Wajah ini di khususkan Bagi Karyawan yang sedang 
                          DINAS LUAR dan untuk Camera DEVICE yang tidak compatible dengan Barcode Scanner
                      </Text>
                      
                      
                  </View>

                  <View className="pb-96 " />
              </ScrollView>

              {location ? renderLocation() : undefined }
          </View>
    </View>
  )
}

export default AbsenMap

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
    return Math.trunc( dist * 1000 );
}

